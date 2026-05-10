# ₿ BITCOIN MINER CARD

```
 ██████╗ ██╗████████╗ ██████╗ ██████╗ ██╗███╗   ██╗
 ██╔══██╗██║╚══██╔══╝██╔════╝██╔═══██╗██║████╗  ██║
 ██████╔╝██║   ██║   ██║     ██║   ██║██║██╔██╗ ██║
 ██╔══██╗██║   ██║   ██║     ██║   ██║██║██║╚██╗██║
 ██████╔╝██║   ██║   ╚██████╗╚██████╔╝██║██║ ╚████║
 ╚═════╝ ╚═╝   ╚═╝    ╚═════╝ ╚═════╝ ╚═╝╚═╝  ╚═══╝
           M I N E R   C A R D   v1.0
  INSERT COIN TO MONITOR YOUR RIG  >>>  ₿₿₿
```

> **PLAYER ONE — YOUR MINER IS ON THE DASHBOARD.**

A neon-drenched, retro-futuristic Lovelace card for Home Assistant that turns your Bitcoin miner telemetry into a proper arcade experience. Designed to work with the [Crypto Miner Home Assistant Fleet](https://github.com/daylehouse/crypto-miner-home-assistant-fleet) integration.

<img src="./concept.png" alt="Bitcoin Miner Card preview" width="480">

---

## 🕹️ FEATURES — POWER-UPS INCLUDED

| Feature | Status |
|---|---|
| Neon-styled miner cockpit with alien font | ✅ ACTIVE |
| Live hashrate display, big and bold | ✅ ACTIVE |
| Dual-axis chart — hashrate + temperature history | ✅ ACTIVE |
| Animated spinning fan icon tied to fan speed % | ✅ ACTIVE |
| Overheat warning overlay with pulsing aqua glow | ✅ ACTIVE |
| All-time best & session-best difficulty fade rotator | ✅ ACTIVE |
| Mining pool selector gear menu (HA select entity) | ✅ ACTIVE |
| Scrolling stats ticker — pool URL, port, shares | ✅ ACTIVE |
| Configurable chart time span (5 / 15 / 30 / 60 min) | ✅ ACTIVE |
| Clickable IP address — opens miner web UI | ✅ ACTIVE |
| Mobile-optimised layout | ✅ ACTIVE |
| HACS-ready, no manual JS fiddling | ✅ ACTIVE |

---

## 🚀 INSTALLATION — INSERT COIN

### HACS *(recommended — no cheat codes required)*

1. In Home Assistant, open **HACS**.
2. Click the menu (⋮), then select **Custom repositories**.
3. Paste this repository URL and select category **Dashboard**.
4. Hit **Download** → install **Bitcoin Miner Card**.
5. Restart Home Assistant.
6. Add the card to your dashboard and watch the neon glow.

---

## ⚙️ CONFIGURATION — CHOOSE YOUR FIGHTER

All entities are optional — only configure what your miner exposes. The card gracefully hides sections with no data.

| Field | Description |
|---|---|
| `title_entity` | Sensor used for the card title |
| `miner_name_entity` | IP address / hostname (clickable link to miner UI) |
| `hashrate_entity` | Live hashrate sensor |
| `temperature_entity` | Temperature sensor |
| `overheat_entity` | Binary overheat sensor: `0` = cool, `1` = 🔥 DANGER |
| `fan_entity` | Fan speed (%) — drives the spinning fan animation |
| `mining_pool_select_entity` | HA select entity for pool switching via gear menu |
| `pool_url_entity` | Pool URL shown in ticker |
| `pool_port_entity` | Pool port shown in ticker |
| `shares_accepted_entity` | Accepted shares shown in ticker |
| `shares_rejected_entity` | Rejected shares shown in ticker |
| `all_time_best_difficulty_entity` | All-time best difficulty score (fades in on sun area) |
| `session_best_difficulty_entity` | Current session best difficulty (fades in on sun area) |
| `power_entity` | Power consumption (W) |
| `model_entity` | Miner model name |
| `overheat_threshold` | Temperature threshold for overheat warning (default: `85`) |
| `chart_span_minutes` | History chart span: `5`, `15`, `30`, or `60` (default: `60`) |

---

## 🏆 HIGH SCORE

If your miner sets a new all-time best difficulty, the card will display it front and centre — fading in over the sun area like a true arcade achievement. Game on.

---

## 🛠️ DEVELOPMENT — EXTRA LIFE

```bash
# Clone the repo
git clone https://github.com/daylehouse/bitcoin-miner-card.git
cd bitcoin-miner-card

# Install dependencies
npm install

# Build (JS + assets + gzip)
npm run build

# Output lands in dist/
# Copy dist/* to your HA www/community/bitcoin-miner-card/ folder
```

---

*GAME OVER? Never. Your miner never sleeps. Neither does this card.*

---

## ₿ SUPPORT THE DEV — INSERT COIN FOR REAL

If this card saved you time, made your dashboard look sick, or your miner just hit a new all-time best difficulty — buy the dev a satoshi.

**Bitcoin:** `bc1qqa5weng9wh682vcas6a8c8jqw43t4hnt8f7ks9`

**Bitcoin Cash:** `bitcoincash:qzcv0zwwguz0z9j0v8nd8yp4rxuqpadtegmr09tmer`

```
  ⣿⣿⣿⣿⣿ THANK YOU FOR PLAYING ⣿⣿⣿⣿⣿
```



