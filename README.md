# Bitcoin Miner Card

A custom Lovelace card for Home Assistant focused on monitoring Bitcoin miner telemetry.

![Bitcoin Miner Card preview](./concept.png)

## Features

- Neon-styled miner status card driven by a single base image template
- Configurable entities for hashrate, temperature, power, and model
- State-driven overheat overlay that appears when temperature exceeds threshold


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


Overheat mode is activated when temperature_entity is greater than or equal to overheat_threshold
