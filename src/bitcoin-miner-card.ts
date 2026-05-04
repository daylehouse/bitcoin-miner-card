import { css, html, LitElement, nothing, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import alienRegularUrl from "../Alien-Encounters-Regular.ttf";
import alienBoldUrl from "../Alien-Encounters-Bold.ttf";

const backgroundImageUrl = new URL("./background-v2.png", import.meta.url).toString();
const alienRegularFontUrl = new URL(alienRegularUrl, import.meta.url).toString();
const alienBoldFontUrl = new URL(alienBoldUrl, import.meta.url).toString();

interface HomeAssistant {
  states: Record<string, { state: string; attributes?: Record<string, unknown> }>;
}

interface BitcoinMinerCardConfig {
  type?: string;
  title_entity?: string;
  miner_name_entity?: string;
  hashrate_entity?: string;
  temperature_entity?: string;
  power_entity?: string;
  model_entity?: string;
  overheat_threshold?: number;
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
    return {};
  }

  public static getConfigForm(): ConfigForm {
    return {
      schema: [
        { name: "title_entity", selector: { entity: {} } },
        { name: "miner_name_entity", selector: { entity: {} } },
        { name: "hashrate_entity", selector: { entity: {} } },
        { name: "temperature_entity", selector: { entity: {} } },
        { name: "power_entity", selector: { entity: {} } },
        { name: "model_entity", selector: { entity: {} } }
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
      rows: 5,
      columns: 12,
      min_rows: 5,
      min_columns: 12
    };
  }

  protected render() {
    if (!this.config) {
      return nothing;
    }

    const titleState = this.readState(this.config.title_entity, "");
    const title = this.normalizeForDisplay(titleState.value || "");
    const hashrate = this.readState(this.config.hashrate_entity, "MH/s");
    const temperature = this.readState(this.config.temperature_entity, "°C");
    const power = this.readState(this.config.power_entity, "W");
    const model = this.readState(this.config.model_entity, "");
    const minerNameState = this.readState(this.config.miner_name_entity, "");
    const minerName = this.normalizeForDisplay(minerNameState.value);

    const threshold = this.config.overheat_threshold ?? 85;
    const numericTemp = this.parseNumericState(temperature.value);
    const isOverheat = numericTemp !== null && numericTemp >= threshold;
    const stageStyle = `background-image: url('${backgroundImageUrl}')`;

    return html`
      <ha-card>
        <section class="stage" style=${stageStyle}>
          <div class="title-value">${title}</div>
          <div class="current-row">
            <span class="current current-only">${this.formatState(hashrate)}</span>
          </div>

          <div class="device-values">
            <span class="stat-value value-ip val-white">${minerName}</span>
            <span class="stat-value value-model val-pink">${this.normalizeForDisplay(model.value)}</span>
            <span class="stat-value value-temp ${isOverheat ? 'val-danger' : 'val-amber'}">${this.formatState(temperature)}</span>
            <span class="stat-value value-power val-cyan">${this.formatState(power)}</span>
          </div>
        </section>
      </ha-card>
    `;
  }

  private normalizeForDisplay(value: string): string {
    return value.trim().toUpperCase();
  }

  private formatState(state: { value: string; unit: string }): string {
    const value = this.normalizeForDisplay(state.value);
    if (!value) {
      return "";
    }
    const unit = this.normalizeForDisplay(state.unit);
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
      font-family: "Bitcoin Miner Alien Local";
      src: url(${unsafeCSS(alienRegularFontUrl)}) format("truetype");
      font-weight: 400;
      font-style: normal;
      font-display: block;
    }

    @font-face {
      font-family: "Bitcoin Miner Alien Local";
      src: url(${unsafeCSS(alienBoldFontUrl)}) format("truetype");
      font-weight: 700;
      font-style: normal;
      font-display: block;
    }

    :host {
      --bm-danger: #ff8b3d;
      --bm-text: #ffe9fa;
      --bm-font-stack: "Bitcoin Miner Alien Local", "Bitcoin Miner Alien", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
      display: block;
      font-family: var(--bm-font-stack) !important;
    }

    /* Keep all card text in the shadow DOM on the card-local font stack. */
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

    .stage,
    .title-value,
    .current-row,
    .current,
    .device-values,
    .stat-value {
      font-family: var(--bm-font-stack);
    }

    .stage {
      position: relative;
      width: 100%;
      aspect-ratio: 3 / 2;
      background-size: cover;
      background-position: center;
      overflow: hidden;
    }

    .title-value {
      position: absolute;
      left: 12.7%;
      top: 16.0%;
      width: 47%;
      color: #ffffff;
      font-size: clamp(0.95rem, 3.2cqw, 1.8rem);
      font-weight: 700;
      letter-spacing: 0.11em;
      line-height: 1;
      text-transform: uppercase;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-shadow: none;
    }

    .current-row {
      position: absolute;
      left: 10.5%;
      top: 67.65%;
      width: 52%;
      font-size: clamp(0.55rem, 1.8cqw, 1.1rem);
      font-weight: 700;
      letter-spacing: 0.01em;
      text-align: right;
    }

    .current {
      color: #ffffff;
      white-space: nowrap;
      text-shadow: none;
      overflow: hidden;
      text-overflow: ellipsis;
      text-transform: uppercase;
    }

    .current.current-only {
      display: block;
      width: 100%;
      text-align: right;
      font-size: clamp(1.15rem, 3.6cqw, 2.1rem);
      transform: translate(0, 0.12em);
      -webkit-text-stroke: 0.7px #15ff00;
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
      font-size: clamp(0.92rem, 2.9cqw, 1.68rem);
      font-weight: 700;
      line-height: 1.02;
      text-shadow: none;
      color: var(--bm-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 92%;
      text-transform: uppercase;
    }
    .val-cyan   { color: #9ffbff; text-shadow: none; }
    .val-white  { color: #ffffff; text-shadow: none; }
    .val-pink   { color: #ff86da; text-shadow: none; }
    .val-amber  { color: #ffd86f; text-shadow: none; }
    .val-danger { color: var(--bm-danger); text-shadow: none; animation: tempAlert 0.9s ease-in-out infinite; }

    .device-values > .value-ip { top: 51.90%; left: 70.00%; width: 24.00%; height: 6.20%; }
    .device-values > .value-model { top: 59.85%; left: 70.00%; width: 24.00%; height: 6.20%; }
    .device-values > .value-temp { top: 67.20%; left: 70.00%; width: 24.00%; height: 6.20%; }
    .device-values > .value-power { top: 74.50%; left: 70.00%; width: 24.00%; height: 6.20%; }

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
      .title-value { font-size: clamp(0.8rem, 2.8cqw, 1.2rem); }
      .current-row {
        left: auto;
        right: 31.5%;
        top: 83.5%;
        width: 58%;
        font-size: clamp(0.5rem, 1.9cqw, 0.85rem);
      }
      .current.current-only {
        font-size: clamp(0.95rem, 3cqw, 1.45rem);
        transform: translate(0, 0.12em);
        -webkit-text-stroke: 0.45px #15ff00;
      }
      .stat-value { font-size: clamp(0.75rem, 2.6cqw, 1.12rem); }
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
