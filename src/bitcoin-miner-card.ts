import { css, html, LitElement, nothing, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

const alienRegularUrl = new URL("./alien-encounters-regular.ttf", import.meta.url).toString();
const alienBoldUrl = new URL("./alien-encounters-bold.ttf", import.meta.url).toString();

interface HomeAssistant {
  states: Record<string, { state: string; attributes?: Record<string, unknown> }>;
}

interface BitcoinMinerCardConfig {
  type?: string;
  title?: string;
  title_entity?: string;
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
        { name: "title_entity", selector: { entity: {} } },
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
          case "title_entity":
            return "Title Entity";
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
          case "title_entity":
            return "Optional sensor. Its state overrides Card Title text.";
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

    const titleState = this.readState(this.config.title_entity, "");
    const title = titleState.value || this.config.title || "";
    const hashrate = this.readState(this.config.hashrate_entity, "MH/s");
    const temperature = this.readState(this.config.temperature_entity, "°C");
    const power = this.readState(this.config.power_entity, "W");
    const model = this.readState(this.config.model_entity, "");
    const minerNameState = this.readState(this.config.miner_name_entity, "");
    const minerName = minerNameState.value;

    const threshold = this.config.overheat_threshold ?? 85;
    const numericTemp = this.parseNumericState(temperature.value);
    const isOverheat = numericTemp !== null && numericTemp >= threshold;
    const temperatureClass = isOverheat ? "stat-value accent-danger" : "stat-value";
    const baseImage = this.resolveAssetUrl(this.config.base_image, "background-v2.png");
    const stageStyle = `--bm-base-image: url('${baseImage}')`;

    return html`
      <ha-card>
        <section class="stage" style=${stageStyle}>
          <div class="title-value">${title}</div>
          <div class="current-row">
            <span class="current cyan">${this.formatState(hashrate)}</span>
            <span class="current pink">${this.formatState(temperature)}</span>
          </div>

          <div class="device-values">
            <span class="stat-value value-fire"><span class="label label-cyan">Miner</span><span class="colon">:</span><span class="val val-pink">${minerName}</span></span>
            <span class="stat-value value-gamma"><span class="label label-lavender">Model</span><span class="colon">:</span><span class="val val-pink">${model.value}</span></span>
            <span class="stat-value value-temp"><span class="label label-lavender">Temp</span><span class="colon">:</span><span class="val ${isOverheat ? 'val-danger' : 'val-amber'}">${this.formatState(temperature)}</span></span>
            <span class="stat-value value-power"><span class="label label-cyan">Power</span><span class="colon">:</span><span class="val val-cyan">${this.formatState(power)}</span></span>
          </div>
        </section>
      </ha-card>
    `;
  }

  private formatState(state: { value: string; unit: string }): string {
    const value = state.value.trim();
    if (!value) {
      return "";
    }
    const unit = state.unit.trim();
    return unit ? `${value} ${unit}` : value;
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
      return { value: "", unit: "" };
    }
    const entity = this.hass.states[entityId];
    if (!entity) {
      return { value: "", unit: "" };
    }
    const unit = (entity.attributes?.unit_of_measurement as string | undefined) ?? defaultUnit;
    return { value: entity.state, unit };
  }

  static styles = css`
    @font-face {
      font-family: "Alien Encounters";
      src: url(${unsafeCSS(alienRegularUrl)}) format("truetype");
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: "Alien Encounters";
      src: url(${unsafeCSS(alienBoldUrl)}) format("truetype");
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }

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

    .title-value {
      position: absolute;
      left: 12.7%;
      top: 16.0%;
      width: 47%;
      color: #ff77de;
      background: linear-gradient(
        90deg,
        #ff4fd2 0%,
        #ff79df 45%,
        #ffb7f2 100%
      );
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      font-family: "Alien Encounters", sans-serif;
      font-size: clamp(0.8rem, 2.02vw, 1.72rem);
      font-weight: 700;
      letter-spacing: 0.11em;
      line-height: 1;
      text-transform: uppercase;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-shadow: 0 0 14px rgba(255, 80, 210, 0.82), 0 0 4px rgba(255, 80, 210, 0.95);
    }

    .current-row {
      position: absolute;
      left: 10.65%;
      top: 67.65%;
      width: 45.10%;
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 7%;
      align-items: end;
      font-family: "Alien Encounters", sans-serif;
      font-size: clamp(0.52rem, 1.36vw, 1.18rem);
      font-weight: 700;
      letter-spacing: 0.01em;
    }

    .current {
      white-space: nowrap;
      text-shadow: 0 0 8px currentColor;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .current:first-child {
      justify-self: start;
    }

    .current:last-child {
      justify-self: end;
      text-align: right;
    }

    .device-values {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .stat-value {
      position: absolute;
      transform: translate(0, -50%);
      text-align: left;
      font-size: clamp(0.56rem, 1.18vw, 1.02rem);
      font-weight: 700;
      line-height: 1.02;
      font-family: "Alien Encounters", sans-serif;
      text-shadow: 0 0 6px rgba(255, 236, 248, 0.25);
      color: var(--bm-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 92%;
    }

    .stat-value .label {
      font-weight: 700;
      letter-spacing: 0.03em;
      text-transform: none;
    }

    .label-cyan { color: rgba(194, 242, 255, 0.98); }
    .label-lavender { color: rgba(213, 185, 255, 0.98); }

    .stat-value .colon {
      display: inline-block;
      margin-left: 0.06em;
      margin-right: 0.52em;
      font-weight: 700;
    }

    .value-fire .label,
    .value-fire .colon,
    .value-power .label,
    .value-power .colon {
      color: rgba(194, 242, 255, 0.98);
      text-shadow: 0 0 8px rgba(120, 230, 255, 0.45);
    }

    .value-gamma .label,
    .value-gamma .colon {
      color: rgba(213, 185, 255, 0.98);
      text-shadow: 0 0 8px rgba(213, 185, 255, 0.42);
    }

    .value-temp .label,
    .value-temp .colon {
      color: rgba(213, 185, 255, 0.98);
      text-shadow: 0 0 8px rgba(213, 185, 255, 0.42);
    }

    .val {
      font-weight: 700;
      letter-spacing: 0.02em;
    }
    .val-cyan   { color: #9ffbff; text-shadow: 0 0 8px rgba(138, 246, 255, 0.72); }
    .val-pink   { color: #ff86da; text-shadow: 0 0 9px rgba(255, 134, 218, 0.75); }
    .val-amber  { color: #ffd86f; text-shadow: 0 0 10px rgba(255, 173, 76, 0.78); }
    .val-danger { color: var(--bm-danger); text-shadow: 0 0 10px rgba(255, 139, 61, 0.95); animation: tempAlert 0.9s ease-in-out infinite; }

    .device-values > .value-fire { top: 54.00%; left: 70.00%; width: 16.00%; height: 6.20%; }
    .device-values > .value-gamma { top: 61.00%; left: 70.00%; width: 16.00%; height: 6.20%; }
    .device-values > .value-temp { top: 68.50%; left: 70.00%; width: 16.00%; height: 6.20%; }
    .device-values > .value-power { top: 75.50%; left: 70.00%; width: 16.00%; height: 6.20%; }

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

    @media (max-width: 540px) {
      .title-value { font-size: clamp(0.54rem, 1.65vw, 0.9rem); }
      .current-row { top: 83.1%; font-size: clamp(0.42rem, 1.2vw, 0.68rem); }
      .stat-value { font-size: clamp(0.35rem, 1.05vw, 0.54rem); }
      .stat-value:nth-child(1),
      .stat-value:nth-child(2) { font-size: clamp(0.33rem, 0.98vw, 0.5rem); }
      .stat-value:nth-child(3),
      .stat-value:nth-child(4) { font-size: clamp(0.35rem, 1.05vw, 0.54rem); }
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
