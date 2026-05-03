import { css, html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

interface HomeAssistant {
  states: Record<string, { state: string; attributes?: Record<string, unknown> }>;
}

interface BitcoinMinerCardConfig {
  type?: string;
  title?: string;
  miner_name?: string;
  miner_name_entity?: string;
  hashrate_entity?: string;
  temperature_entity?: string;
  power_entity?: string;
  model_entity?: string;
  overheat_threshold?: number;
  base_image?: string;
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

@customElement("bitcoin-miner-card")
export class BitcoinMinerCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @property({ attribute: false }) public config?: BitcoinMinerCardConfig;

  public static getStubConfig(): BitcoinMinerCardConfig {
    return {
      title: "Crypto Miner Stats",
      miner_name: "Rig-01"
    };
  }

  public static getConfigForm(): ConfigForm {
    return {
      schema: [
        { name: "title", selector: { text: {} } },
        { name: "miner_name", selector: { text: {} } },
        { name: "miner_name_entity", selector: { entity: {} } },
        { name: "hashrate_entity", selector: { entity: {} } },
        { name: "temperature_entity", selector: { entity: {} } },
        { name: "power_entity", selector: { entity: {} } },
        { name: "model_entity", selector: { entity: {} } },
        {
          type: "grid",
          name: "",
          flatten: true,
          column_min_width: "180px",
          schema: [
            {
              name: "overheat_threshold",
              selector: {
                number: {
                  min: 0,
                  max: 140,
                  step: 1,
                  mode: "box",
                  unit_of_measurement: "°C"
                }
              }
            },
            { name: "base_image", selector: { text: {} } }
          ]
        }
      ],
      computeLabel: (schema) => {
        switch (schema.name) {
          case "title":
            return "Card Title";
          case "miner_name":
            return "Miner Name";
          case "miner_name_entity":
            return "Miner Name Entity";
          case "hashrate_entity":
            return "Hashrate Entity";
          case "temperature_entity":
            return "Temperature Entity";
          case "power_entity":
            return "Power Entity";
          case "model_entity":
            return "Model Entity";
          case "overheat_threshold":
            return "Overheat Threshold";
          case "base_image":
            return "Base Image URL";
          default:
            return undefined;
        }
      },
      computeHelper: (schema) => {
        switch (schema.name) {
          case "miner_name_entity":
            return "Optional sensor. Its state overrides Miner Name text.";
          case "base_image":
            return "Optional path/URL. Defaults to bundled background-v2.png.";
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
      title: "Crypto Miner Stats",
      miner_name: "Rig-01",
      overheat_threshold: 85,
      ...config
    };
  }

  public getCardSize(): number {
    return 3;
  }

  public getGridOptions(): {
    rows: number;
    columns: number;
    min_rows: number;
    min_columns: number;
  } {
    return {
      rows: 4,
      columns: 6,
      min_rows: 3,
      min_columns: 6
    };
  }

  protected render() {
    if (!this.config) {
      return nothing;
    }

    const hashrate = this.readState(this.config.hashrate_entity, "MH/s");
    const temperature = this.readState(this.config.temperature_entity, "°C");
    const power = this.readState(this.config.power_entity, "W");
    const model = this.readState(this.config.model_entity, "");
    const minerNameState = this.readState(this.config.miner_name_entity, "");
    const minerName =
      minerNameState.value !== "-" ? minerNameState.value : this.config.miner_name ?? "Unknown";

    const threshold = this.config.overheat_threshold ?? 85;
    const numericTemp = this.parseNumericState(temperature.value);
    const isOverheat = numericTemp !== null && numericTemp >= threshold;
    const temperatureClass = isOverheat ? "stat-value accent-danger" : "stat-value";
    const baseImage = this.resolveAssetUrl(this.config.base_image, "background-v2.png");
    const stageStyle = `--bm-base-image: url('${baseImage}')`;

    return html`
      <ha-card>
        <section class="stage" style=${stageStyle}>
          <div class="legend-row">
            <span class="legend-item cyan">Hashrate</span>
            <span class="legend-item pink">Temperature</span>
          </div>

          <div class="chart-area">
            <div class="left-scale"><span>900</span><span>600</span><span>300</span><span>0</span></div>
            <svg class="chart" viewBox="0 0 600 220" preserveAspectRatio="none" role="img" aria-label="Miner trend lines">
              <polyline class="line-hashrate" points="0,135 45,118 90,126 135,116 180,120 225,98 270,108 315,126 360,112 405,133 450,142 495,126 540,129 600,116"></polyline>
              <polyline class="line-temp" points="0,170 45,164 90,145 135,152 180,139 225,129 270,142 315,123 360,109 405,114 450,87 495,102 540,95 600,81"></polyline>
            </svg>
            <div class="right-scale"><span>90</span><span>70</span><span>50</span><span>30</span></div>
          </div>

          <div class="axis-row"><span>12:00</span><span>12:30</span><span>1:00</span><span>1:30</span></div>

          <div class="current-row">
            <span class="current cyan">${hashrate.value} ${hashrate.unit}</span>
            <span class="current pink">${temperature.value} ${temperature.unit}</span>
          </div>

          <div class="device-values">
            <span class="stat-value">${minerName}</span>
            <span class="stat-value">${model.value || "Unavailable"}</span>
            <span class=${temperatureClass}>${temperature.value}${temperature.unit}</span>
            <span class="stat-value accent-cyan">${power.value} ${power.unit}</span>
          </div>
        </section>
      </ha-card>
    `;
  }

  private parseNumericState(state: string): number | null {
    const match = state.match(/-?\d+(\.\d+)?/);
    if (!match) {
      return null;
    }
    const numeric = Number(match[0]);
    return Number.isFinite(numeric) ? numeric : null;
  }

  private resolveAssetUrl(configValue: string | undefined, fallbackFile: string): string {
    if (configValue && configValue.trim().length > 0) {
      return configValue;
    }
    return new URL(`./${fallbackFile}`, import.meta.url).toString();
  }

  private readState(entityId?: string, defaultUnit = ""): { value: string; unit: string } {
    if (!this.hass || !entityId) {
      return { value: "-", unit: defaultUnit };
    }
    const entity = this.hass.states[entityId];
    if (!entity) {
      return { value: "-", unit: defaultUnit };
    }
    const unit = (entity.attributes?.unit_of_measurement as string | undefined) ?? defaultUnit;
    return { value: entity.state, unit };
  }

  static styles = css`
    :host {
      --bm-edge: #ff43ba;
      --bm-edge-alt: #42d3ff;
      --bm-danger: #ff8b3d;
      --bm-text: #ffe9fa;
      --bm-base-image: none;
      display: block;
    }

    ha-card {
      overflow: hidden;
      border-radius: 24px;
      background: #090615;
      color: var(--bm-text);
      border: 1px solid rgba(255, 103, 205, 0.4);
    }

    .stage {
      position: relative;
      width: 100%;
      aspect-ratio: 3 / 2;
      background-image: var(--bm-base-image);
      background-size: cover;
      background-position: center;
      overflow: hidden;
    }

    .legend-row {
      position: absolute;
      left: 12.8%;
      top: 18.5%;
      display: inline-flex;
      gap: 5%;
      width: 33%;
      font-size: clamp(0.45rem, 1.05vw, 0.9rem);
      font-weight: 700;
      font-family: "Exo 2", sans-serif;
    }

    .legend-item::before {
      content: "";
      display: inline-block;
      width: 1.8em;
      height: 0.28em;
      border-radius: 999px;
      margin-right: 0.48em;
      vertical-align: middle;
      box-shadow: 0 0 8px currentColor;
    }

    .legend-item.cyan::before { background: var(--bm-edge-alt); }
    .legend-item.pink::before { background: var(--bm-edge); }

    .chart-area {
      position: absolute;
      left: 10.9%;
      top: 29.4%;
      width: 47.6%;
      height: 40.8%;
      display: grid;
      grid-template-columns: 11% 78% 11%;
      align-items: stretch;
    }

    .left-scale,
    .right-scale {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-family: "Orbitron", "Exo 2", sans-serif;
      font-size: clamp(0.45rem, 0.86vw, 0.73rem);
      font-weight: 700;
      color: rgba(255, 207, 245, 0.85);
      padding: 4% 0;
    }

    .chart {
      width: 100%;
      height: 100%;
      background: transparent;
    }

    .line-hashrate,
    .line-temp {
      fill: none;
      stroke-width: 4;
      stroke-linecap: round;
      stroke-linejoin: round;
      filter: drop-shadow(0 0 3px currentColor);
    }

    .line-hashrate { stroke: var(--bm-edge-alt); color: var(--bm-edge-alt); }
    .line-temp { stroke: var(--bm-edge); color: var(--bm-edge); }

    .axis-row {
      position: absolute;
      left: 12%;
      top: 70.6%;
      width: 45%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      font-size: clamp(0.5rem, 0.98vw, 0.86rem);
      font-weight: 700;
      color: rgba(255, 204, 236, 0.92);
      font-family: "Exo 2", sans-serif;
      text-align: center;
    }

    .current-row {
      position: absolute;
      left: 11.9%;
      top: 79.8%;
      width: 45.6%;
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 2%;
      font-family: "Orbitron", "Exo 2", sans-serif;
      font-size: clamp(0.62rem, 1.7vw, 1.5rem);
      font-weight: 700;
    }

    .current {
      white-space: nowrap;
      text-shadow: 0 0 8px currentColor;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .device-values {
      position: absolute;
      left: 70.7%;
      top: 45.1%;
      width: 21%;
      height: 25.1%;
      display: grid;
      grid-template-rows: repeat(4, 1fr);
    }

    .stat-value {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: clamp(0.45rem, 0.98vw, 0.88rem);
      font-weight: 700;
      line-height: 1;
      font-family: "Orbitron", "Exo 2", sans-serif;
      text-shadow: 0 0 8px rgba(255, 236, 248, 0.3);
      color: var(--bm-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-right: 3%;
    }

    .stat-value:nth-child(1),
    .stat-value:nth-child(2) {
      font-size: clamp(0.42rem, 0.9vw, 0.78rem);
    }

    .stat-value:nth-child(3),
    .stat-value:nth-child(4) {
      font-size: clamp(0.46rem, 1.05vw, 0.92rem);
    }

    .stat-value:nth-child(1) { transform: translateY(-2%); }
    .stat-value:nth-child(2) { transform: translateY(-1%); }
    .stat-value:nth-child(3) { transform: translateY(1%); }
    .stat-value:nth-child(4) { transform: translateY(2%); }

    .accent-cyan { color: var(--bm-edge-alt); }
    .accent-danger {
      color: var(--bm-danger);
      text-shadow: 0 0 10px rgba(255, 139, 61, 0.95);
      animation: tempAlert 0.9s ease-in-out infinite;
    }

    @keyframes tempAlert {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.62; }
    }

    @media (max-width: 1100px) {
      .legend-row { top: 18.8%; width: 34%; }
      .device-values { left: 70.3%; width: 21.7%; }
    }

    @media (max-width: 540px) {
      .legend-row { font-size: clamp(0.4rem, 1.35vw, 0.68rem); width: 36%; }
      .chart-area { left: 10.4%; width: 48.6%; }
      .axis-row { font-size: clamp(0.4rem, 1.25vw, 0.6rem); }
      .current-row { font-size: clamp(0.46rem, 1.44vw, 0.75rem); }
      .left-scale, .right-scale { font-size: clamp(0.36rem, 1.05vw, 0.56rem); }
      .device-values { left: 70.3%; top: 45.3%; width: 21.7%; height: 24.8%; }
      .stat-value { font-size: clamp(0.38rem, 1.22vw, 0.6rem); }
      .stat-value:nth-child(1),
      .stat-value:nth-child(2) { font-size: clamp(0.35rem, 1.08vw, 0.54rem); }
      .stat-value:nth-child(3),
      .stat-value:nth-child(4) { font-size: clamp(0.38rem, 1.22vw, 0.6rem); }
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
window.customCards.push({
  type: "bitcoin-miner-card",
  name: "Bitcoin Miner Card",
  preview: false,
  description: "A custom card for monitoring Bitcoin miner stats.",
  documentationURL:
    "https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card/"
});
