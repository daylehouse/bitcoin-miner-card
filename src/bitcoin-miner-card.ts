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
  background_image?: string;
  overheat_image?: string;
  stats_image?: string;
  show_overheat?: boolean;
}

interface ConfigFormControl {
  name: keyof BitcoinMinerCardConfig | string;
  required?: boolean;
  selector?: Record<string, unknown>;
  type?: string;
  schema?: ConfigFormControl[];
  flatten?: boolean;
  column_min_width?: string;
  title?: string;
}

interface ConfigForm {
  schema: ConfigFormControl[];
  computeLabel?: (schema: ConfigFormControl) => string | undefined;
  computeHelper?: (schema: ConfigFormControl) => string | undefined;
  assertConfig?: (config: BitcoinMinerCardConfig) => void;
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
        {
          name: "title",
          selector: { text: {} }
        },
        {
          name: "miner_name",
          selector: { text: {} }
        },
        {
          name: "miner_name_entity",
          selector: { entity: {} }
        },
        {
          name: "hashrate_entity",
          selector: { entity: {} }
        },
        {
          name: "temperature_entity",
          selector: { entity: {} }
        },
        {
          name: "power_entity",
          selector: { entity: {} }
        },
        {
          name: "model_entity",
          selector: { entity: {} }
        },
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
            {
              name: "show_overheat",
              selector: { boolean: {} }
            }
          ]
        },
        {
          type: "expandable",
          name: "",
          title: "Asset URL Overrides",
          flatten: true,
          schema: [
            {
              name: "background_image",
              selector: { text: {} }
            },
            {
              name: "overheat_image",
              selector: { text: {} }
            },
            {
              name: "stats_image",
              selector: { text: {} }
            }
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
          case "show_overheat":
            return "Show Overheat Overlay";
          case "background_image":
            return "Background Image URL";
          case "overheat_image":
            return "Overheat Image URL";
          case "stats_image":
            return "Stats Panel Image URL";
          default:
            return undefined;
        }
      },
      computeHelper: (schema) => {
        switch (schema.name) {
          case "miner_name_entity":
            return "Optional sensor. Its state overrides Miner Name text when available.";
          case "temperature_entity":
            return "Used to trigger overheat mode when the threshold is reached.";
          case "overheat_threshold":
            return "Warning overlay appears when temperature is equal to or above this value.";
          case "background_image":
            return "Optional path or URL. Leave blank to use bundled background.png.";
          case "overheat_image":
            return "Optional path or URL. Leave blank to use bundled overheat.png.";
          case "stats_image":
            return "Optional path or URL. Leave blank to use bundled stats.png.";
          default:
            return undefined;
        }
      },
      assertConfig: (config) => {
        if (
          config.overheat_threshold !== undefined &&
          (!Number.isFinite(config.overheat_threshold) || config.overheat_threshold < -50)
        ) {
          throw new Error("overheat_threshold must be a valid number");
        }
      }
    };
  }

  public setConfig(config: BitcoinMinerCardConfig): void {
    if (!config) {
      throw new Error("Invalid configuration for bitcoin-miner-card");
    }

    if (
      config.overheat_threshold !== undefined &&
      (!Number.isFinite(config.overheat_threshold) || config.overheat_threshold < -50)
    ) {
      throw new Error("overheat_threshold must be a valid number");
    }

    this.config = {
      title: "Crypto Miner Stats",
      miner_name: "Rig-01",
      overheat_threshold: 85,
      show_overheat: true,
      ...config
    };
  }

  public getCardSize(): number {
    return 4;
  }

  public getGridOptions(): {
    rows: number;
    columns: number;
    min_rows: number;
    min_columns: number;
  } {
    return {
      rows: 5,
      columns: 9,
      min_rows: 4,
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
    const minerNameState = this.readState(this.config.miner_name_entity, "");
    const model = this.readState(this.config.model_entity, "");
    const minerName =
      minerNameState.value !== "-" ? minerNameState.value : this.config.miner_name ?? "Unknown";
    const threshold = this.config.overheat_threshold ?? 85;
    const numericTemp = this.parseNumericState(temperature.value);
    const isOverheat =
      (this.config.show_overheat ?? true) &&
      numericTemp !== null &&
      numericTemp >= threshold;
    const backgroundImage = this.resolveAssetUrl(this.config.background_image, "background.png");
    const overheatImage = this.resolveAssetUrl(this.config.overheat_image, "overheat.png");
    const statsImage = this.resolveAssetUrl(this.config.stats_image, "stats.png");
    const temperatureClass = isOverheat ? "value accent-danger" : "value accent-pink";
    const sceneStyle = `--bm-bg-image: url('${backgroundImage}')`;
    const statsStyle = `--bm-stats-image: url('${statsImage}')`;

    return html`
      <ha-card>
        <section class="scene" style=${sceneStyle}>
          <div class="scene-glow"></div>
          <header class="title-row">
            <h2>${this.config.title}</h2>
          </header>

          <div class="content-grid">
            <section class="chart-panel">
              <div class="legend-row">
                <span class="legend-item cyan">Hashrate</span>
                <span class="legend-item pink">Temperature</span>
              </div>
              <div class="chart-shell">
                <div class="left-scale">
                  <span>900</span>
                  <span>600</span>
                  <span>300</span>
                  <span>0</span>
                </div>
                <svg class="chart" viewBox="0 0 600 220" preserveAspectRatio="none" role="img" aria-label="Miner trend lines">
                  <g class="chart-grid">
                    <line x1="0" y1="40" x2="600" y2="40"></line>
                    <line x1="0" y1="100" x2="600" y2="100"></line>
                    <line x1="0" y1="160" x2="600" y2="160"></line>
                    <line x1="120" y1="0" x2="120" y2="220"></line>
                    <line x1="240" y1="0" x2="240" y2="220"></line>
                    <line x1="360" y1="0" x2="360" y2="220"></line>
                    <line x1="480" y1="0" x2="480" y2="220"></line>
                  </g>
                  <polyline
                    class="line-hashrate"
                    points="0,135 45,118 90,126 135,116 180,120 225,98 270,108 315,126 360,112 405,133 450,142 495,126 540,129 600,116"
                  ></polyline>
                  <polyline
                    class="line-temp"
                    points="0,170 45,164 90,145 135,152 180,139 225,129 270,142 315,123 360,109 405,114 450,87 495,102 540,95 600,81"
                  ></polyline>
                </svg>
                <div class="right-scale">
                  <span>90</span>
                  <span>70</span>
                  <span>50</span>
                  <span>30</span>
                </div>
              </div>
              <div class="axis-row">
                <span>12:00</span>
                <span>12:30</span>
                <span>1:00</span>
                <span>1:30</span>
              </div>
              <div class="current-row">
                <span class="current cyan">${hashrate.value} ${hashrate.unit}</span>
                <span class="current pink">${temperature.value} ${temperature.unit}</span>
              </div>
            </section>

            <aside class="miner-panel">
              ${isOverheat
                ? html`<img class="overheat-image" src=${overheatImage} alt="Overheat warning" />`
                : nothing}

              <div class="stat-stack" style=${statsStyle}>
                <div class="stats-art" role="img" aria-label="Miner stats template"></div>
                <div class="stat-values">
                  <span class="stat-value">${minerName}</span>
                  <span class="stat-value">${model.value || "Unavailable"}</span>
                  <span class=${`stat-value ${temperatureClass}`}>${temperature.value}${temperature.unit}</span>
                  <span class="stat-value accent-cyan">${power.value} ${power.unit}</span>
                </div>
              </div>

              ${isOverheat
                ? html`<div class="warning-chip">Overheat active (${threshold}${temperature.unit || "°C"})</div>`
                : nothing}
            </aside>
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

    const unit =
      (entity.attributes?.unit_of_measurement as string | undefined) ?? defaultUnit;

    return {
      value: entity.state,
      unit
    };
  }

  static styles = css`
    :host {
      --bm-edge: #ff43ba;
      --bm-edge-alt: #42d3ff;
      --bm-danger: #ff8b3d;
      --bm-text: #ffe9fa;
      --bm-panel: rgba(6, 3, 23, 0.78);
      --bm-bg-image: none;
      --bm-stats-image: none;
      display: block;
    }

    ha-card {
      overflow: hidden;
      border-radius: 34px;
      background: #0a0818;
      color: var(--bm-text);
      border: 1px solid rgba(255, 103, 205, 0.58);
      box-shadow: 0 0 30px rgba(255, 58, 171, 0.38), inset 0 0 26px rgba(60, 160, 255, 0.13);
    }

    .scene {
      position: relative;
      padding: 22px 22px 24px;
      min-height: 360px;
      background-image:
        linear-gradient(160deg, rgba(4, 0, 17, 0.53), rgba(8, 1, 22, 0.62)),
        var(--bm-bg-image);
      background-size: cover;
      background-position: center;
      isolation: isolate;
    }

    .scene-glow {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(circle at 20% 75%, rgba(23, 235, 255, 0.16), transparent 42%),
        radial-gradient(circle at 85% 16%, rgba(255, 78, 147, 0.32), transparent 38%);
      z-index: -1;
    }

    .title-row {
      margin-bottom: 12px;
      border-bottom: 2px solid rgba(255, 76, 182, 0.72);
      padding-bottom: 10px;
    }

    h2 {
      margin: 0;
      font-size: clamp(1.25rem, 2.9vw, 2.2rem);
      font-weight: 800;
      letter-spacing: 0.07em;
      font-family: "Orbitron", "Exo 2", sans-serif;
      text-transform: uppercase;
      color: #ffc8f0;
      text-shadow: 0 0 10px rgba(255, 61, 184, 0.7);
    }

    .content-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.46fr) minmax(0, 0.9fr);
      gap: 14px;
      align-items: stretch;
    }

    .chart-panel {
      border: 1px solid rgba(255, 124, 214, 0.44);
      border-radius: 18px;
      background: var(--bm-panel);
      padding: 14px 12px 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      backdrop-filter: blur(1px);
      box-shadow: inset 0 0 18px rgba(255, 74, 181, 0.13);
    }

    .legend-row {
      display: flex;
      gap: 16px;
      font-size: clamp(0.84rem, 1.15vw, 1rem);
      font-weight: 700;
      padding-left: 4px;
      font-family: "Exo 2", sans-serif;
    }

    .legend-item::before {
      content: "";
      display: inline-block;
      width: 24px;
      height: 4px;
      border-radius: 999px;
      margin-right: 8px;
      vertical-align: middle;
      box-shadow: 0 0 8px currentColor;
    }

    .chart-shell {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 10px;
      align-items: stretch;
    }

    .left-scale,
    .right-scale {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-family: "Orbitron", "Exo 2", sans-serif;
      font-size: clamp(0.72rem, 1vw, 0.86rem);
      font-weight: 700;
      color: rgba(255, 207, 245, 0.85);
      padding: 2px 0;
    }

    .legend-item.cyan::before {
      background: var(--bm-edge-alt);
    }

    .legend-item.pink::before {
      background: var(--bm-edge);
    }

    .chart {
      width: 100%;
      height: clamp(180px, 24vw, 238px);
      border: 1px solid rgba(255, 95, 193, 0.44);
      border-radius: 12px;
      background: rgba(8, 6, 20, 0.65);
    }

    .chart-grid line {
      stroke: rgba(105, 128, 255, 0.32);
      stroke-width: 1;
    }

    .line-hashrate,
    .line-temp {
      fill: none;
      stroke-width: 4;
      stroke-linecap: round;
      stroke-linejoin: round;
      filter: drop-shadow(0 0 3px currentColor);
    }

    .line-hashrate {
      stroke: var(--bm-edge-alt);
      color: var(--bm-edge-alt);
    }

    .line-temp {
      stroke: var(--bm-edge);
      color: var(--bm-edge);
    }

    .axis-row {
      display: flex;
      justify-content: space-between;
      font-size: clamp(0.82rem, 1.25vw, 1rem);
      font-weight: 700;
      color: rgba(255, 204, 236, 0.92);
      font-family: "Exo 2", sans-serif;
      padding: 0 2px;
    }

    .current-row {
      margin-top: 2px;
      display: flex;
      justify-content: space-between;
      gap: 12px;
      font-family: "Orbitron", "Exo 2", sans-serif;
      font-size: clamp(1rem, 2vw, 1.7rem);
      font-weight: 700;
    }

    .current {
      white-space: nowrap;
      text-shadow: 0 0 8px currentColor;
    }

    .miner-panel {
      border: 1px solid rgba(255, 124, 214, 0.44);
      border-radius: 18px;
      background: linear-gradient(180deg, rgba(10, 6, 30, 0.28) 0%, rgba(8, 6, 27, 0.88) 34%);
      padding: 12px 12px 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      position: relative;
      overflow: hidden;
      box-shadow: inset 0 0 18px rgba(255, 74, 181, 0.11);
    }

    .overheat-image {
      position: absolute;
      top: 2px;
      right: 0;
      left: 0;
      margin: 0 auto;
      max-width: 88%;
      max-height: 96px;
      object-fit: contain;
      filter: drop-shadow(0 0 12px rgba(255, 123, 60, 0.8));
      animation: alarmPulse 1.2s ease-in-out infinite;
      pointer-events: none;
      z-index: 2;
    }

    .stat-stack {
      position: relative;
      width: 98%;
      aspect-ratio: 596 / 464;
      border-radius: 10px;
      overflow: hidden;
      margin-top: auto;
      margin-inline: auto;
    }

    .stats-art {
      position: absolute;
      inset: 0;
      background-image: var(--bm-stats-image);
      background-size: cover;
      background-position: center;
      filter: drop-shadow(0 0 10px rgba(255, 81, 202, 0.38));
    }

    .stat-values {
      position: absolute;
      inset: 0;
      display: grid;
      grid-template-rows: repeat(4, 1fr);
      padding: 5.2% 6% 4.6% 50.6%;
      pointer-events: none;
    }

    .stat-value {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: clamp(0.92rem, 1.32vw, 1.72rem);
      font-weight: 700;
      line-height: 1.05;
      font-family: "Orbitron", "Exo 2", sans-serif;
      text-shadow: 0 0 8px rgba(255, 236, 248, 0.3);
      text-align: left;
      color: var(--bm-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .value {
      font-size: clamp(1rem, 1.55vw, 1.7rem);
      font-weight: 700;
      line-height: 1.1;
      font-family: "Orbitron", "Exo 2", sans-serif;
      text-shadow: 0 0 8px rgba(255, 236, 248, 0.3);
      text-align: right;
    }

    .accent-cyan {
      color: var(--bm-edge-alt);
      text-shadow: 0 0 8px rgba(79, 211, 255, 0.45);
    }

    .accent-pink {
      color: #ff66cb;
      text-shadow: 0 0 8px rgba(255, 102, 203, 0.45);
    }

    .accent-danger {
      color: var(--bm-danger);
      text-shadow: 0 0 10px rgba(255, 139, 61, 0.95);
      animation: tempAlert 0.9s ease-in-out infinite;
    }

    .warning-chip {
      margin-top: auto;
      text-align: center;
      font-family: "Orbitron", "Exo 2", sans-serif;
      font-size: 0.8rem;
      font-weight: 700;
      color: #ffd8b2;
      border: 1px solid rgba(255, 163, 94, 0.7);
      border-radius: 999px;
      padding: 6px 8px;
      background: linear-gradient(90deg, rgba(255, 78, 49, 0.35), rgba(255, 131, 39, 0.26));
      box-shadow: 0 0 12px rgba(255, 102, 45, 0.5);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    @keyframes alarmPulse {
      0%,
      100% {
        opacity: 0.84;
        transform: scale(0.98);
      }

      50% {
        opacity: 1;
        transform: scale(1.02);
      }
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

    @media (max-width: 1100px) {
      .content-grid {
        grid-template-columns: 1fr;
      }

      .stat-stack {
        margin-top: auto;
      }

      .value {
        font-size: 1.4rem;
      }

      .current-row {
        font-size: 1.5rem;
      }

      .stat-values {
        padding-left: 51.8%;
      }
    }

    @media (max-width: 540px) {
      .scene {
        padding: 12px;
      }

      .stat-stack {
        margin-top: auto;
      }

      .overheat-image {
        top: 4px;
        max-height: 66px;
      }

      .value {
        font-size: 1rem;
      }

      .axis-row {
        font-size: 0.9rem;
      }

      .current-row {
        font-size: 1rem;
      }

      .chart {
        height: 200px;
      }

      .left-scale,
      .right-scale {
        font-size: 0.72rem;
      }

      .stat-values {
        padding-left: 52.8%;
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
window.customCards.push({
  type: "bitcoin-miner-card",
  name: "Bitcoin Miner Card",
  preview: false,
  description: "A custom card for monitoring Bitcoin miner stats.",
  documentationURL:
    "https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card/"
});
