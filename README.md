# Bitcoin Miner Card

A custom Lovelace card for Home Assistant focused on monitoring Bitcoin miner telemetry.

![Bitcoin Miner Card preview](./concept.png)

## Features

- Neon-styled miner status card driven by a single base image template
- Configurable entities for hashrate, temperature, power, and model
- State-driven overheat overlay that appears when temperature exceeds threshold
- Uses bundled base template asset: base.png
- Built-in Home Assistant visual configuration form support
- Lightweight TypeScript + Lit implementation
- HACS-compatible repository metadata

## Installation

### HACS (recommended)

1. In Home Assistant, go to HACS.
2. Open the menu, then select Custom repositories.
3. Add this repository URL and choose category Plugin.
4. Install Bitcoin Miner Card.
5. Restart Home Assistant.
6. Add the card resource if not auto-added:
   - URL: `/hacsfiles/<repository-name>/bitcoin-miner-card.js`
   - Resource type: JavaScript Module

### Manual

1. Build the project with `npm run build`.
2. Copy `dist/bitcoin-miner-card.js` to `/config/www/community/bitcoin-miner-card/bitcoin-miner-card.js`.
3. Add resource in Home Assistant:
   - URL: `/local/community/bitcoin-miner-card/bitcoin-miner-card.js`
   - Resource type: JavaScript Module

## Lovelace Configuration

```yaml
type: custom:bitcoin-miner-card
title: Crypto Miner Stats
miner_name: Rig-01
miner_name_entity: sensor.rig_01_name
hashrate_entity: sensor.rig_01_hashrate
temperature_entity: sensor.rig_01_temperature
power_entity: sensor.rig_01_power
model_entity: sensor.rig_01_model
overheat_threshold: 85
show_overheat: true
# Optional override paths (defaults point to bundled assets next to the card JS)
# base_image: /local/community/bitcoin-miner-card/base.png
```

## 

Overheat mode is activated when temperature_entity is greater than or equal to overheat_threshold
