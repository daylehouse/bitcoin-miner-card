import { css, html, LitElement, nothing } from "lit";
import type { PropertyValues } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import type { ChartConfiguration } from "chart.js";
import Chart from "chart.js/auto";
import { customElement, property, state } from "lit/decorators.js";

const alienRegularFontUrl = new URL("Alien-Encounters-Regular.ttf", import.meta.url).toString();
const alienBoldFontUrl = new URL("Alien-Encounters-Bold.ttf", import.meta.url).toString();
const backgroundImageUrl = new URL("base-layer.png", import.meta.url).toString();
const overheatImageUrl = new URL("overheat.png", import.meta.url).toString();
const globalFontStyleId = "bitcoin-miner-card-fonts";
const chartUpdateIntervalMs = 60000;
const chartHistoryThrottleMs = 60000;

function ensureAlienFontsRegistered(): void {
  if (typeof document === "undefined") {
    return;
  }

  if (!document.getElementById(globalFontStyleId)) {
    const style = document.createElement("style");
    style.id = globalFontStyleId;
    style.textContent = `
      @font-face {
        font-family: "Bitcoin Miner Alien Local";
        src: url("${alienRegularFontUrl}") format("truetype");
        font-weight: 400;
        font-style: normal;
        font-display: block;
      }

      @font-face {
        font-family: "Bitcoin Miner Alien Local";
        src: url("${alienBoldFontUrl}") format("truetype");
        font-weight: 700;
        font-style: normal;
        font-display: block;
      }
    `;
    document.head.appendChild(style);
  }

  if ("fonts" in document) {
    void document.fonts.load('400 1em "Bitcoin Miner Alien Local"');
    void document.fonts.load('700 1em "Bitcoin Miner Alien Local"');
  }
}

interface HomeAssistantEntityState {
  state: string;
  attributes?: Record<string, unknown>;
}

interface HomeAssistantConnection {
  sendMessagePromise<T = unknown>(message: unknown): Promise<T>;
}

interface HomeAssistant {
  states: Record<string, HomeAssistantEntityState>;
  connection?: HomeAssistantConnection;
  callService?: (domain: string, service: string, serviceData?: Record<string, unknown>) => void;
}

interface BitcoinMinerCardConfig {
  type?: string;
  title_entity?: string;
  miner_name_entity?: string;
  hashrate_entity?: string;
  temperature_entity?: string;
  overheat_entity?: string;
  fan_entity?: string;
  mining_pool_select_entity?: string;
  pool_url_entity?: string;
  pool_port_entity?: string;
  shares_accepted_entity?: string;
  shares_rejected_entity?: string;
  power_entity?: string;
  model_entity?: string;
  overheat_threshold?: number;
  chart_span_minutes?: number;
}

interface ConfigFormControl {
  name: keyof BitcoinMinerCardConfig | string;
  selector?: Record<string, unknown>;
  type?: string;
  schema?: ConfigFormControl[];
  flatten?: boolean;
  column_min_width?: string;
}

interface ConfigForm {
  schema: ConfigFormControl[];
  computeLabel?: (schema: ConfigFormControl) => string | undefined;
  computeHelper?: (schema: ConfigFormControl) => string | undefined;
}

interface ReadStateResult {
  value: string;
  unit: string;
}

interface HistoryPoint {
  s?: string;
  lu?: number;
  last_updated_ts?: number;
  state?: string;
}

@customElement("bitcoin-miner-card")
export class BitcoinMinerCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @property({ attribute: false }) public config?: BitcoinMinerCardConfig;

  private chart: Chart | null = null;

  private chartData: { labels: string[]; hashrate: number[]; temp: number[] } = {
    labels: [],
    hashrate: [],
    temp: []
  };

  private chartUpdateInterval: number | null = null;

  private lastHistoryFetch = 0;

  @state() private isPoolMenuOpen = false;

  public connectedCallback(): void {
    super.connectedCallback();
    ensureAlienFontsRegistered();
    void this.fetchAndPopulateHistory(true);
    this.startChartUpdater();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();

    if (this.chartUpdateInterval !== null) {
      clearInterval(this.chartUpdateInterval);
      this.chartUpdateInterval = null;
    }

    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  public static getStubConfig(): BitcoinMinerCardConfig {
    return {};
  }

  public static getConfigForm(): ConfigForm {
    return {
      schema: [
        { name: "title_entity", selector: { entity: {} } },
        { name: "miner_name_entity", selector: { entity: {} } },
        { name: "hashrate_entity", selector: { entity: {} } },
        { name: "temperature_entity", selector: { entity: {} } },
        { name: "overheat_entity", selector: { entity: {} } },
        { name: "fan_entity", selector: { entity: {} } },
        { name: "mining_pool_select_entity", selector: { entity: {} } },
        { name: "pool_url_entity", selector: { entity: {} } },
        { name: "pool_port_entity", selector: { entity: {} } },
        { name: "shares_accepted_entity", selector: { entity: {} } },
        { name: "shares_rejected_entity", selector: { entity: {} } },
        {
          name: "chart_span_minutes",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: 5, label: "5 minutes" },
                { value: 15, label: "15 minutes" },
                { value: 30, label: "30 minutes" },
                { value: 60, label: "60 minutes" }
              ]
            }
          }
        },
        { name: "power_entity", selector: { entity: {} } },
        { name: "model_entity", selector: { entity: {} } },
      ],
      computeLabel: (schema) => {
        switch (schema.name) {
          case "title_entity":
            return "Title Entity";
          case "miner_name_entity":
            return "IP Address";
          case "hashrate_entity":
            return "Hashrate Entity";
          case "temperature_entity":
            return "Temperature Entity";
          case "overheat_entity":
            return "Overheat Entity (0/1)";
          case "fan_entity":
            return "Fan Entity";
          case "mining_pool_select_entity":
            return "Mining Pool Select Entity";
          case "pool_url_entity":
            return "Pool URL Entity";
          case "pool_port_entity":
            return "Pool Port Entity";
          case "shares_accepted_entity":
            return "Shares Accepted Entity";
          case "shares_rejected_entity":
            return "Shares Rejected Entity";
          case "chart_span_minutes":
            return "Chart Time Span";
          case "power_entity":
            return "Power Entity";
          case "model_entity":
            return "Model Entity";
          default:
            return undefined;
        }
      },
      computeHelper: (schema) => {
        switch (schema.name) {
          case "title_entity":
            return "Sensor used for the title line.";
          case "miner_name_entity":
            return "Sensor used for the IP address line.";
          case "overheat_entity":
            return "Binary overheat sensor: 0 = normal, 1 = overheat.";
          case "fan_entity":
            return "Fan speed sensor shown as percent.";
          case "mining_pool_select_entity":
            return "Home Assistant select entity used by the popup menu for pool selection.";
          case "pool_url_entity":
            return "Entity shown in ticker as pool URL.";
          case "pool_port_entity":
            return "Entity shown in ticker as pool port.";
          case "shares_accepted_entity":
            return "Entity shown in ticker as accepted shares.";
          case "shares_rejected_entity":
            return "Entity shown in ticker as rejected shares.";
          case "chart_span_minutes":
            return "Time span of historical data to display in the chart.";
          default:
            return undefined;
        }
      }
    };
  }

  public setConfig(config: BitcoinMinerCardConfig): void {
    if (!config) {
      throw new Error("Invalid configuration for bitcoin-miner-card");
    }

    this.config = {
      overheat_threshold: 85,
      chart_span_minutes: 60,
      ...config
    };
  }

  public getCardSize(): number {
    return 3;
  }

  public getGridOptions(): {
    rows: number;
    columns: number | "full";
    min_rows: number;
    min_columns: number;
    max_columns: number;
  } {
    return {
      rows: 5,
      columns: "full",
      min_rows: 5,
      min_columns: 12,
      max_columns: 12
    };
  }

  protected render() {
    if (!this.config) {
      return nothing;
    }

    const titleState = this.readState(this.config.title_entity, "");
    const title = this.normalizeForDisplay(titleState.value);
    const hashrate = this.readState(this.config.hashrate_entity, "MH/s");
    const temperature = this.readState(this.config.temperature_entity, "°C");
    const power = this.readState(this.config.power_entity, "W");
    const model = this.readState(this.config.model_entity, "");
    const minerNameState = this.readState(this.config.miner_name_entity, "");
    const minerName = this.normalizeForDisplay(minerNameState.value);
    const overheatState = this.readState(this.config.overheat_entity, "");
    const fan = this.readState(this.config.fan_entity, "%");
    const poolUrl = this.readState(this.config.pool_url_entity, "");
    const poolPort = this.readState(this.config.pool_port_entity, "");
    const sharesAccepted = this.readState(this.config.shares_accepted_entity, "");
    const sharesRejected = this.readState(this.config.shares_rejected_entity, "");

    const threshold = this.config.overheat_threshold ?? 85;
    const numericTemp = this.parseNumericState(temperature.value);
    const overheatFromEntity = this.parseOverheatState(overheatState.value);
    const isOverheat =
      overheatFromEntity ?? (numericTemp !== null && numericTemp >= threshold);
    const stageStyle = `background-image: url('${backgroundImageUrl}')`;

    const fanPercentage = this.parseNumericState(fan.value);
    const fanSpinStyles = this.getFanSpinStyles(fanPercentage);
    const fanDisplayValue =
      fanPercentage === null ? this.formatState(fan) : `${Math.round(fanPercentage)} %`;
    const miningPools = this.getMiningPoolOptionsFromSelectEntity();
    const hasMiningPools = miningPools.length > 0;
    const activeMiningPool = this.getActiveMiningPool(miningPools);
    const tickerText = [
      `POOL URL: ${this.normalizeForDisplay(poolUrl.value)}`,
      `POOL PORT: ${this.normalizeForDisplay(poolPort.value)}`,
      `SHARES ACCEPTED: ${this.normalizeForDisplay(sharesAccepted.value)}`,
      `SHARES REJECTED: ${this.normalizeForDisplay(sharesRejected.value)}`
    ].join("  |  ");

    return html`
      <ha-card>
        <section class="stage" style=${stageStyle}>
          ${isOverheat
            ? html`<img
                class="overheat-indicator"
                src=${overheatImageUrl}
                alt="Overheat warning"
              />`
            : nothing}
          <canvas
            id="miner-graph"
            width="368"
            height="239"
            style="position:absolute; left:5.75%; top:20.5%; width:56.5%; height:46.8%; background:transparent; z-index:10; border:none;"
          ></canvas>
          <div class="title-value">${title}</div>
          <div class="fan-indicator">
            <span class="fan-icon" style=${styleMap(fanSpinStyles)} aria-hidden="true"></span>
            <span class="fan-value">${fanDisplayValue}</span>
          </div>
          <button
            class="fan-gear-button"
            @click=${this.togglePoolMenu}
            title="Open mining pool menu"
            aria-label="Open mining pool menu"
          >
            ⚙︎
          </button>
          <div class="sun-ticker" aria-label="Mining pool stats ticker">
            <div class="sun-ticker-track">
              <span>${tickerText}</span>
              <span aria-hidden="true">${tickerText}</span>
            </div>
          </div>
          ${this.isPoolMenuOpen
            ? html`<button
                class="pool-menu-backdrop"
                @click=${this.closePoolMenu}
                aria-label="Close mining pool menu"
              ></button>`
            : nothing}
          <div class="pool-menu ${this.isPoolMenuOpen ? "is-open" : ""}" @click=${this.onPoolMenuClick}>
            <label class="pool-menu-label" for="pool-select">Mining Pool</label>
            <select
              id="pool-select"
              class="pool-menu-select"
              .value=${activeMiningPool}
              ?disabled=${!hasMiningPools}
              @change=${this.onMiningPoolChange}
            >
              ${hasMiningPools
                ? miningPools.map(
                    (pool) => html`<option value=${pool}>${pool}</option>`
                  )
                : html`<option value="">No pools configured</option>`}
            </select>
          </div>
          <div class="hashrate-row">
            <span class="hashrate-value">${this.formatState(hashrate)}</span>
          </div>
          <div class="device-values">
            <span
              class="stat-value value-ip val-white val-link"
              @click=${() => this.openMinerUI(minerName)}
              title="Open miner UI"
            >${minerName}</span>
            <span class="stat-value value-model val-pink"
              >${this.normalizeForDisplay(model.value)}</span
            >
            <span class="stat-value value-temp ${isOverheat ? "val-danger" : "val-amber"}"
              >${this.formatState(temperature)}</span
            >
            <span class="stat-value value-power val-cyan"
              >${this.formatState(power)}</span
            >
          </div>
        </section>
      </ha-card>
    `;
  }

  protected updated(): void {
    this.renderChart();
  }

  protected willUpdate(changedProperties: PropertyValues<this>): void {
    if (
      changedProperties.has("hass") ||
      changedProperties.has("config")
    ) {
      void this.fetchAndPopulateHistory(true);
    }
  }

  private startChartUpdater(): void {
    if (this.chartUpdateInterval !== null) {
      return;
    }

    this.chartUpdateInterval = window.setInterval(() => {
      void this.fetchAndPopulateHistory();
    }, chartUpdateIntervalMs);
  }

  /**
   * Fetches the last hour of history for hashrate and temperature entities and populates the chart data.
   */
  private async fetchAndPopulateHistory(force = false): Promise<void> {
    if (!this.hass || !this.config || !this.hass.connection) {
      return;
    }

    const hashrateEntity = this.config.hashrate_entity;
    const tempEntity = this.config.temperature_entity;
    if (!hashrateEntity || !tempEntity) {
      return;
    }

    const nowTs = Date.now();
    if (!force && nowTs - this.lastHistoryFetch < chartHistoryThrottleMs) {
      return;
    }
    this.lastHistoryFetch = nowTs;

    const end = new Date();
    const spanMinutes = this.config.chart_span_minutes ?? 60;
    const start = new Date(end.getTime() - spanMinutes * 60 * 1000);

    try {
      const historyResult = await this.hass.connection.sendMessagePromise<unknown>({
        type: "history/history_during_period",
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        entity_ids: [hashrateEntity, tempEntity],
        minimal_response: true,
        no_attributes: true
      });

      const { hashratePoints, tempPoints } = this.extractHistoryPoints(
        historyResult,
        hashrateEntity,
        tempEntity
      );

      this.chartData = { labels: [], hashrate: [], temp: [] };
      const len = Math.min(hashratePoints.length, tempPoints.length);

      for (let i = 0; i < len; i += 1) {
        const hashPoint = hashratePoints[i];
        const tempPoint = tempPoints[i];

        const rawTimestamp = hashPoint.lu ?? tempPoint.lu ?? hashPoint.last_updated_ts ?? tempPoint.last_updated_ts;
        const timestampMs = typeof rawTimestamp === "number" ? rawTimestamp * 1000 : NaN;
        const ts = new Date(timestampMs);

        const label = Number.isFinite(ts.getTime())
          ? ts.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          : `${i}`;

        const hashValue = parseFloat(hashPoint.s ?? hashPoint.state ?? "NaN");
        const tempValue = parseFloat(tempPoint.s ?? tempPoint.state ?? "NaN");

        if (!Number.isNaN(hashValue) && !Number.isNaN(tempValue)) {
          this.chartData.labels.push(label);
          this.chartData.hashrate.push(hashValue);
          this.chartData.temp.push(tempValue);
        }
      }

      if (this.chartData.labels.length === 0) {
        const hashrateState = this.readState(hashrateEntity, "MH/s");
        const tempState = this.readState(tempEntity, "°C");
        const hashrateValue = this.parseNumericState(hashrateState.value);
        const tempValue = this.parseNumericState(tempState.value);

        if (hashrateValue !== null && tempValue !== null) {
          this.chartData.labels.push("Now");
          this.chartData.hashrate.push(hashrateValue);
          this.chartData.temp.push(tempValue);
        }
      }

      this.renderChart();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to fetch history for bitcoin-miner-card", error);
    }
  }

  private extractHistoryPoints(
    historyResult: unknown,
    hashrateEntity: string,
    tempEntity: string
  ): { hashratePoints: HistoryPoint[]; tempPoints: HistoryPoint[] } {
    if (historyResult && typeof historyResult === "object" && !Array.isArray(historyResult)) {
      const resultMap = historyResult as Record<string, HistoryPoint[]>;
      return {
        hashratePoints: resultMap[hashrateEntity] ?? [],
        tempPoints: resultMap[tempEntity] ?? []
      };
    }

    if (Array.isArray(historyResult)) {
      const entities = historyResult as Array<Array<HistoryPoint & { entity_id?: string }>>;
      const hashratePoints = entities.find((series) => series[0]?.entity_id === hashrateEntity) ?? [];
      const tempPoints = entities.find((series) => series[0]?.entity_id === tempEntity) ?? [];
      return { hashratePoints, tempPoints };
    }

    return { hashratePoints: [], tempPoints: [] };
  }

  private renderChart(): void {
    const canvas = this.renderRoot?.querySelector("#miner-graph") as HTMLCanvasElement | null;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const spanMinutes = this.config?.chart_span_minutes ?? 60;

    const chartConfig: ChartConfiguration<"line", number[], string> = {
      type: "line",
      data: {
        labels: this.chartData.labels,
        datasets: [
          {
            label: "Hashrate",
            data: this.chartData.hashrate,
            borderColor: "#15ff00",
            backgroundColor: "rgba(21,255,0,0.12)",
            yAxisID: "y",
            tension: 0.3,
            pointRadius: 0,
            borderWidth: 2
          },
          {
            label: "Temp",
            data: this.chartData.temp,
            borderColor: "#ff2fd6",
            backgroundColor: "rgba(255,47,214,0.12)",
            yAxisID: "y1",
            tension: 0.3,
            pointRadius: 0,
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: false,
        animation: false,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: "#ffe9fa",
              font: { size: 16, family: "Bitcoin Miner Alien Local" },
              boxWidth: 18,
              boxHeight: 6,
              borderRadius: 1,
              usePointStyle: false
            }
          },
          tooltip: { enabled: true }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: `Last ${spanMinutes} mins`,
              color: "#fff",
              font: { size: 18, family: "Bitcoin Miner Alien Local" }
            },
            ticks: {
              color: "#fff",
              font: { size: 18, family: "Bitcoin Miner Alien Local" },
              maxTicksLimit: 3,
              display: false
            },
            grid: { color: "rgba(255,255,255,0.08)" }
          },
          y: {
            type: "linear",
            display: true,
            position: "left",
            ticks: {
              color: "#fff",
              font: { size: 18, family: "Bitcoin Miner Alien Local" },
              maxTicksLimit: 3,
              callback: (tickValue) => Math.round(Number(tickValue)).toString()
            },
            grid: { color: "rgba(21,255,0,0.08)" }
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            ticks: {
              color: "#fff",
              font: { size: 18, family: "Bitcoin Miner Alien Local" },
              maxTicksLimit: 3,
              callback: (tickValue) => Math.round(Number(tickValue)).toString()
            },
            grid: { color: "rgba(255,47,214,0.08)" }
          }
        }
      }
    };

    if (!this.chart) {
      this.chart = new Chart(context, chartConfig);
      return;
    }

    this.chart.data.labels = this.chartData.labels;
    this.chart.data.datasets[0].data = this.chartData.hashrate;
    this.chart.data.datasets[1].data = this.chartData.temp;
    this.chart.update("none");
  }

  private readState(entityId: string | undefined, fallbackUnit = ""): ReadStateResult {
    if (!entityId || !this.hass) {
      return { value: "--", unit: fallbackUnit };
    }

    const stateObj = this.hass.states[entityId];
    if (!stateObj) {
      return { value: "--", unit: fallbackUnit };
    }

    const unitFromState = stateObj.attributes?.unit_of_measurement;
    const unit = typeof unitFromState === "string" ? unitFromState : fallbackUnit;

    return {
      value: stateObj.state,
      unit
    };
  }

  private formatState(state: ReadStateResult): string {
    const cleanValue = this.normalizeForDisplay(state.value);
    if (cleanValue === "--") {
      return cleanValue;
    }

    return state.unit ? `${cleanValue} ${state.unit}` : cleanValue;
  }

  private normalizeForDisplay(value: unknown): string {
    if (value === null || value === undefined) {
      return "--";
    }

    const text = String(value).trim();
    if (["unknown", "unavailable", "none", "null", "nan"].includes(text.toLowerCase())) {
      return "--";
    }

    return text.length > 0 ? text : "--";
  }

  private parseNumericState(value: string): number | null {
    const numeric = Number.parseFloat(value.replace(/[^0-9.+-]/g, ""));
    return Number.isFinite(numeric) ? numeric : null;
  }

  private parseOverheatState(value: string): boolean | null {
    const normalized = value.trim().toLowerCase();

    if (["1", "on", "true", "yes", "overheat"].includes(normalized)) {
      return true;
    }

    if (["0", "off", "false", "no", "normal"].includes(normalized)) {
      return false;
    }

    return null;
  }

  private openMinerUI(ip: string): void {
    if (!ip || ip === "--") {
      return;
    }
    window.open(`http://${ip}`, "_blank", "noopener,noreferrer");
  }

  private getFanSpinStyles(fanPercentage: number | null): Record<string, string> {
    if (fanPercentage === null || fanPercentage <= 0) {
      return {
        animation: "none"
      };
    }

    const clampedPercentage = Math.min(100, fanPercentage);
    const normalized = clampedPercentage / 100;
    const eased = Math.pow(normalized, 0.45);
    const duration = 7 - eased * 6.5;

    return {
      animationDuration: `${duration.toFixed(2)}s`
    };
  }

  private togglePoolMenu(event: Event): void {
    event.stopPropagation();
    this.isPoolMenuOpen = !this.isPoolMenuOpen;
  }

  private closePoolMenu(): void {
    this.isPoolMenuOpen = false;
  }

  private onPoolMenuClick(event: Event): void {
    event.stopPropagation();
  }

  private onMiningPoolChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const selectedPool = select.value;
    const selectEntityId = this.config?.mining_pool_select_entity;

    if (this.hass?.callService && selectEntityId) {
      this.hass.callService("select", "select_option", {
        entity_id: selectEntityId,
        option: selectedPool
      });
    }

    this.dispatchEvent(
      new CustomEvent("mining-pool-changed", {
        detail: { pool: selectedPool },
        bubbles: true,
        composed: true
      })
    );
  }

  private getMiningPoolOptionsFromSelectEntity(): string[] {
    const selectEntityId = this.config?.mining_pool_select_entity;
    if (!selectEntityId || !this.hass) {
      return [];
    }

    const stateObj = this.hass.states[selectEntityId];
    const options = stateObj?.attributes?.options;
    if (!Array.isArray(options)) {
      return [];
    }

    return options
      .map((option) => (option === null || option === undefined ? "" : String(option).trim()))
      .filter((option) => option.length > 0);
  }

  private getActiveMiningPool(miningPools: string[]): string {
    if (miningPools.length === 0) {
      return "";
    }

    const selectEntityId = this.config?.mining_pool_select_entity;
    const rawState = selectEntityId && this.hass ? this.hass.states[selectEntityId]?.state : "";
    const currentState = rawState ? String(rawState).trim() : "";

    if (currentState && miningPools.includes(currentState)) {
      return currentState;
    }

    return miningPools[0];
  }

  static styles = css`
    :host {
      --bm-danger: #ff8b3d;
      --bm-text: #ffe9fa;
      --bm-font-stack: "Bitcoin Miner Alien Local", "Bitcoin Miner Alien", -apple-system,
        BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
      --bm-title-left: 7%;
      --bm-title-top: 11%;
      --bm-title-width: 47%;
      --bm-fan-top: 12.5%;
      --bm-fan-left: 74%;
      --bm-gear-top: 12.5%;
      --bm-gear-left: 92%;
      --bm-hashrate-left: 5.75%;
      --bm-hashrate-top: 75.65%;
      --bm-hashrate-width: 69%;
      --bm-hashrate-value-width: 100%;
      --bm-panel-left: 73%;
      --bm-panel-width: 24%;
      --bm-ip-top: 56.9%;
      --bm-model-top: 66.85%;
      --bm-temp-top: 76%;
      --bm-power-top: 86.5%;
      display: block;
      font-family: var(--bm-font-stack) !important;
    }

    :host *,
    ha-card,
    ha-card * {
      font-family: var(--bm-font-stack) !important;
    }

    ha-card {
      overflow: hidden;
      border-radius: 24px;
      background: #090615;
      color: var(--bm-text);
      border: 1px solid rgba(255, 103, 205, 0.4);
      container-type: inline-size;
      font-synthesis: none;
    }

    .stage {
      position: relative;
      width: 100%;
      aspect-ratio: 3 / 2;
      background-size: 100% 100%;
      background-position: center;
      overflow: hidden;
    }

    .overheat-indicator {
      position: absolute;
      left: 80.8%;
      top: 36.5%;
      width: 40.24%;
      height: auto;
      transform: translate(-50%, -50%);
      z-index: 5;
      pointer-events: none;
      filter: drop-shadow(0 0 10px rgba(255, 80, 54, 0.55));
      animation: overheatPulse 0.9s ease-in-out infinite;
    }

    .title-value {
      position: absolute;
      left: var(--bm-title-left);
      top: var(--bm-title-top);
      width: var(--bm-title-width);
      color: #ffffff;
      font-size: clamp(1.28rem, 4.26cqw, 2.4rem);
      font-weight: 700;
      letter-spacing: 0.11em;
      line-height: 1;
      text-transform: uppercase;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-shadow: none;
    }

    .fan-indicator {
      position: absolute;
      left: var(--bm-fan-left);
      top: var(--bm-fan-top);
      transform: translate(-50%, -50%);
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: #9ffbff;
      pointer-events: auto;
      max-width: 24%;
      z-index: 22;
    }

    .fan-icon,
    .fan-value {
      pointer-events: none;
    }

    .fan-icon {
      width: clamp(0.99rem, 3.28cqw, 1.84rem);
      height: clamp(0.99rem, 3.28cqw, 1.84rem);
      border-radius: 50%;
      border: 2px solid #fffbfa;
      background: conic-gradient(
        from 0deg,
        transparent 0deg 28deg,
        #9ffbff 28deg 72deg,
        transparent 72deg 148deg,
        #9ffbff 148deg 192deg,
        transparent 192deg 268deg,
        #9ffbff 268deg 312deg,
        transparent 312deg 360deg
      );
      animation: fanSpin 1s linear infinite;
      flex: 0 0 auto;
      margin-top: -0.15rem;
    }

    .fan-value {
      font-size: clamp(1.22rem, 3.08cqw, 1.79rem);
      font-weight: 700;
      line-height: 1;
      white-space: nowrap;
      text-shadow: none;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .fan-gear-button {
      all: unset;
      position: absolute;
      left: var(--bm-gear-left);
      top: var(--bm-gear-top);
      width: clamp(2.62rem, 8.7cqw, 4.88rem);
      height: clamp(2.62rem, 8.7cqw, 4.88rem);
      display: inline-grid;
      place-items: center;
      padding: 0;
      border: none !important;
      border-radius: 0;
      background: none !important;
      background-color: transparent !important;
      background-image: none !important;
      appearance: none;
      -webkit-appearance: none;
      box-shadow: none !important;
      outline: none;
      color: #9ffbff;
      font-family: "Segoe UI Symbol", "Noto Sans Symbols 2", "Apple Symbols", sans-serif;
      font-variant-emoji: text;
      font-size: clamp(2.23rem, 6.95cqw, 3.82rem);
      line-height: 1;
      cursor: pointer;
      pointer-events: auto;
      transform: translate(-50%, -50%);
      transition: transform 0.18s ease, opacity 0.18s ease;
      z-index: 22;
    }

    .fan-gear-button:hover {
      opacity: 0.86;
      transform: translate(-50%, -50%) scale(1.05);
    }

    .sun-ticker {
      position: absolute;
      left: 5.75%;
      top: 86.8%;
      width: 52.25%;
      overflow: hidden;
      pointer-events: none;
      z-index: 12;
      color: #15ff00;
      border-top: 1px solid rgba(21, 255, 0, 0.28);
      border-bottom: 1px solid rgba(21, 255, 0, 0.18);
      padding: 0.2rem 0;
      background: linear-gradient(
        to right,
        rgba(6, 12, 28, 0.45) 0%,
        rgba(6, 12, 28, 0.12) 8%,
        rgba(6, 12, 28, 0.12) 92%,
        rgba(6, 12, 28, 0.45) 100%
      );
    }

    .sun-ticker-track {
      width: max-content;
      display: inline-flex;
      align-items: center;
      gap: 3.6rem;
      white-space: nowrap;
      font-size: clamp(1.01rem, 3.19cqw, 1.85rem);
      font-weight: 700;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      animation: sunTickerScroll 18s linear infinite;
      padding-right: 3.6rem;
      text-shadow: none;
    }

    .pool-menu-backdrop {
      position: absolute;
      inset: 0;
      border: 0;
      background: transparent;
      z-index: 23;
      padding: 0;
      cursor: default;
    }

    .pool-menu {
      position: absolute;
      right: 3.2%;
      top: 16%;
      width: clamp(13.6rem, 39.1cqw, 20rem);
      padding: 0.98rem 1.04rem 1.09rem;
      border-radius: 0.65rem;
      border: 1px solid rgba(159, 251, 255, 0.55);
      background: rgba(4, 9, 24, 0.94);
      box-shadow: 0 0 16px rgba(0, 0, 0, 0.42);
      display: grid;
      gap: 0.63rem;
      opacity: 0;
      transform: translateY(-6px) scale(0.98);
      pointer-events: none;
      transition: opacity 0.16s ease, transform 0.16s ease;
      z-index: 24;
    }

    .pool-menu.is-open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }

    .pool-menu-label {
      color: #9ffbff;
      font-size: clamp(0.85rem, 2.42cqw, 1.17rem);
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .pool-menu-select {
      width: 100%;
      border: 1px solid rgba(159, 251, 255, 0.65);
      border-radius: 0.4rem;
      background: #081429;
      color: #ffffff;
      font-family: var(--bm-font-stack);
      font-size: clamp(0.85rem, 2.37cqw, 1.15rem);
      font-weight: 700;
      padding: 0.55rem 0.6rem;
      outline: none;
    }

    .pool-menu-select:disabled {
      opacity: 0.7;
    }

    .hashrate-row {
      position: absolute;
      left: var(--bm-hashrate-left);
      top: var(--bm-hashrate-top);
      width: var(--bm-hashrate-width);
      font-size: clamp(0.61rem, 1.98cqw, 1.21rem);
      font-weight: 700;
      letter-spacing: 0.01em;
      text-align: left;
    }

    .hashrate-value {
      color: #ffffff;
      display: block;
      width: var(--bm-hashrate-value-width);
      text-align: left;
      font-size: clamp(1.91rem, 5.99cqw, 3.49rem);
      transform: translate(-0.08em, 0.12em);
      -webkit-text-stroke: 0.7px #15ff00;
      white-space: nowrap;
      text-shadow: none;
      overflow: hidden;
      text-overflow: ellipsis;
      text-transform: uppercase;
    }

    .device-values {
      position: absolute;
      top: 0;
      left: var(--bm-panel-left);
      width: var(--bm-panel-width);
      height: 100%;
      pointer-events: none;
    }

    .stat-value {
      position: absolute;
      left: 0;
      width: 100%;
      transform: translate(0, -50%);
      text-align: left;
      font-size: clamp(1.01rem, 3.19cqw, 1.85rem);
      font-weight: 700;
      line-height: 1.02;
      text-shadow: none;
      color: var(--bm-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      text-transform: uppercase;
    }

    .val-cyan {
      color: #9ffbff;
      text-shadow: none;
    }

    .val-white {
      color: #ffffff;
      text-shadow: none;
    }

    .val-link {
      cursor: pointer;
      pointer-events: auto;
    }

    .val-link:hover {
      opacity: 0.8;
    }

    .val-pink {
      color: #ff86da;
      text-shadow: none;
    }

    .val-amber {
      color: #ffd86f;
      text-shadow: none;
    }

    .val-danger {
      color: var(--bm-danger);
      text-shadow: none;
      animation: tempAlert 0.9s ease-in-out infinite;
    }

    .device-values > .value-ip {
      top: var(--bm-ip-top);
    }

    .device-values > .value-model {
      top: var(--bm-model-top);
      font-size: clamp(1.005rem, 3.174cqw, 1.841rem);
    }

    .device-values > .value-temp {
      top: var(--bm-temp-top);
    }

    .device-values > .value-power {
      top: var(--bm-power-top);
    }

    @keyframes tempAlert {
      0%,
      100% {
        opacity: 1;
      }

      50% {
        opacity: 0.62;
      }
    }

    @keyframes fanSpin {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }

    @keyframes overheatPulse {
      0%,
      100% {
        opacity: 1;
      }

      50% {
        opacity: 0.7;
      }
    }

    @keyframes sunTickerScroll {
      from {
        transform: translateX(0);
      }

      to {
        transform: translateX(-50%);
      }
    }

    @media (max-width: 540px) {
      :host {
        --bm-fan-left: 71.5%;
        --bm-gear-left: 93%;
        --bm-gear-top: 12.8%;
      }

      .fan-indicator {
        gap: 0.28rem;
      }

      .fan-icon {
        width: clamp(0.86rem, 3.02cqw, 1.3rem);
        height: clamp(0.86rem, 3.02cqw, 1.3rem);
        margin-top: -0.08rem;
      }

      .fan-value {
        font-size: clamp(0.83rem, 2.86cqw, 1.23rem);
      }

      .pool-menu {
        right: 2.2%;
        top: 15.8%;
        width: clamp(12.42rem, 64.4cqw, 16.68rem);
        padding: 0.92rem 0.9rem 1.01rem;
      }

      .fan-gear-button {
        width: clamp(2.1rem, 6.96cqw, 3.9rem);
        height: clamp(2.1rem, 6.96cqw, 3.9rem);
        font-size: clamp(1.78rem, 5.56cqw, 3.06rem);
        color: #9ffbff;
        text-shadow: none;
        opacity: 1;
        -webkit-tap-highlight-color: transparent;
      }

      .sun-ticker {
        left: 5.75%;
        top: 87.4%;
        width: 51.25%;
        padding: 0.14rem 0;
      }

      .sun-ticker-track {
        gap: 2.5rem;
        padding-right: 2.5rem;
          font-size: clamp(0.415rem, 1.43cqw, 0.615rem);
      }

      .overheat-indicator {
        left: 81.3%;
        top: 37%;
        width: 47.85%;
      }

      .title-value {
        font-size: clamp(1.07rem, 3.73cqw, 1.6rem);
      }

      .hashrate-row {
        left: 5.75%;
        right: auto;
        top: 78.8%;
        width: 70%;
        font-size: clamp(0.55rem, 2.09cqw, 0.94rem);
      }

      .hashrate-value {
        font-size: clamp(1.59rem, 4.99cqw, 2.42rem);
        transform: translate(-0.24em, -0.08em);
        -webkit-text-stroke: 0.45px #15ff00;
      }

      .stat-value {
        font-size: clamp(0.83rem, 2.86cqw, 1.23rem);
      }

      .device-values > .value-model {
        font-size: clamp(0.826rem, 2.846cqw, 1.224rem);
      }
    }
  `;
}

declare global {
  interface CustomCardRegistration {
    type: string;
    name: string;
    preview?: boolean;
    description?: string;
    documentationURL?: string;
  }

  interface Window {
    customCards: CustomCardRegistration[];
  }
}

window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === "bitcoin-miner-card")) {
  window.customCards.push({
    type: "bitcoin-miner-card",
    name: "Bitcoin Miner Card",
    preview: false,
    description: "A custom card for monitoring Bitcoin miner stats.",
    documentationURL:
      "https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card/"
  });
}
