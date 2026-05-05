import { css, html, LitElement, nothing, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import alienRegularRawUrl from "../Alien-Encounters-Regular.ttf";
import alienBoldRawUrl from "../Alien-Encounters-Bold.ttf";
import backgroundRawUrl from "../base-layer.png";

const alienRegularFontUrl = new URL(alienRegularRawUrl.toLowerCase(), import.meta.url).toString();
const alienBoldFontUrl = new URL(alienBoldRawUrl.toLowerCase(), import.meta.url).toString();
const backgroundImageUrl = new URL(backgroundRawUrl, import.meta.url).toString();
const globalFontStyleId = "bitcoin-miner-card-fonts";

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

interface HomeAssistant {
  states: Record<string, { state: string; attributes?: Record<string, unknown> }>;
}

interface BitcoinMinerCardConfig {
  type?: string;
  title_entity?: string;
  miner_name_entity?: string;
  hashrate_entity?: string;
  temperature_entity?: string;
  overheat_entity?: string;
  fan_entity?: string;
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

  public connectedCallback(): void {
    super.connectedCallback();
    ensureAlienFontsRegistered();
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
          case "overheat_entity":
            return "Overheat Entity (0/1)";
          case "fan_entity":
            return "Fan Entity";
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
    const title = this.normalizeForDisplay(titleState.value || "");
    const hashrate = this.readState(this.config.hashrate_entity, "MH/s");
    const temperature = this.readState(this.config.temperature_entity, "°C");
    const power = this.readState(this.config.power_entity, "W");
    const model = this.readState(this.config.model_entity, "");
    const minerNameState = this.readState(this.config.miner_name_entity, "");
    const minerName = this.normalizeForDisplay(minerNameState.value);
    const overheatState = this.readState(this.config.overheat_entity, "");
    const fan = this.readState(this.config.fan_entity, "%");

    const threshold = this.config.overheat_threshold ?? 85;
    const numericTemp = this.parseNumericState(temperature.value);
    const overheatFromEntity = this.parseOverheatState(overheatState.value);
    const isOverheat = overheatFromEntity ?? (numericTemp !== null && numericTemp >= threshold);
    const stageStyle = `background-image: url('${backgroundImageUrl}')`;

    return html`
      <ha-card>
        <section class="stage" style=${stageStyle}>
          <div class="title-value">${title}</div>
          <div class="fan-indicator">
            <span class="fan-icon" aria-hidden="true"></span>
            <span class="fan-value">${this.formatState(fan)}</span>
          </div>
          <div class="hashrate-row">
            <span class="hashrate-value">${this.formatState(hashrate)}</span>
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

  private parseOverheatState(state: string): boolean | null {
    const numeric = this.parseNumericState(state);
    if (numeric === null) {
      return null;
    }
    return numeric >= 1;
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
      --bm-title-left: 7%;
      --bm-title-top: 11%;
      --bm-title-width: 47%;
      --bm-fan-top: 11.5%;
      --bm-fan-left: 86%;
      --bm-hashrate-left: 10%;
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
      gap: 0.32rem;
      color: #9ffbff;
      pointer-events: none;
      max-width: 24%;
    }

    .fan-icon {
      width: clamp(1.13rem, 3.75cqw, 2.11rem);
      height: clamp(1.13rem, 3.75cqw, 2.11rem);
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
      font-size: clamp(1.82rem, 5.7cqw, 3.32rem);
      transform: translate(0, 0.12em);
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
    .val-cyan   { color: #9ffbff; text-shadow: none; }
    .val-white  { color: #ffffff; text-shadow: none; }
    .val-pink   { color: #ff86da; text-shadow: none; }
    .val-amber  { color: #ffd86f; text-shadow: none; }
    .val-danger { color: var(--bm-danger); text-shadow: none; animation: tempAlert 0.9s ease-in-out infinite; }

    .device-values > .value-ip { top: var(--bm-ip-top); }
    .device-values > .value-model { top: var(--bm-model-top); }
    .device-values > .value-temp { top: var(--bm-temp-top); }
    .device-values > .value-power { top: var(--bm-power-top); }

    @keyframes tempAlert {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.62; }
    }

    @keyframes fanSpin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @media (max-width: 540px) {
      .title-value { font-size: clamp(1.07rem, 3.73cqw, 1.6rem); }
      .hashrate-row {
        left: 18%;
        right: auto;
        top: 80.5%;
        width: 70%;
        font-size: clamp(0.55rem, 2.09cqw, 0.94rem);
      }
      .hashrate-value {
        font-size: clamp(1.51rem, 4.75cqw, 2.3rem);
        transform: translate(0, 0.12em);
        -webkit-text-stroke: 0.45px #15ff00;
      }
      .stat-value { font-size: clamp(0.83rem, 2.86cqw, 1.23rem); }
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
