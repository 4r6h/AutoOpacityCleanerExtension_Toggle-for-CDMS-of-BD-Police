# Auto Opacity & CD Cleaner – Chrome Extension

A Chrome extension that toggles opacity of all elements to full visibility and removes specific CD-related texts/buttons from CDMS pages.  
Now with **Double‑Click Active Mode** for automatic cleaning on every page load.

---

## ✨ Features

- **Set opacity to `1.0`** – makes all elements fully visible.
- **Hide specific warning texts** (e.g., `"CDMS স্বয়ংক্রিয় ভাবে তৈরী খসড়া রিপোর্ট..."`).
- **Remove "Confirm CD" button** and its parent container (to free up space).
- **Single‑click toggle** – click once to clean current page, click again to restore.
- **Double‑click Active Mode** – enable auto‑cleaning on every CDMS page load.
- **Active mode persists** across browser sessions (saved in `chrome.storage`).
- **Lightweight & fast** – runs as a content script when needed.

---

## 🧩 How It Works

### 🔹 Single Click (Normal Mode)
- If **Active Mode is OFF**, a single click on the extension icon will:
  - **Clean** the current page (if not already cleaned).
  - **Restore** the page (if already cleaned).
- This works exactly like the original version.

### 🔹 Double Click (Active Mode Toggle)
- **Double‑click** the extension icon to:
  - **Turn ON Active Mode** – all CDMS pages will be cleaned **automatically** when you load them.  
    (The "Confirm CD" button and warning texts are removed instantly.)
  - **Turn OFF Active Mode** – the page is restored, and auto‑cleaning stops.
- While Active Mode is **ON**, single clicks (or multiple clicks) do **nothing** – you must double‑click again to turn it off.

---

## 📦 Files Included

| File | Purpose |
|------|---------|
| `manifest.json` | Extension configuration & permissions |
| `background.js` | Handles click detection (single/double) and Active Mode state |
| `content.js` | Main logic for cleaning/restoring the page |
| `icons/` | Extension icons (16×16, 48×48, 128×128) |

---

## 🔧 Installation

1. Download or clone this repository.
2. Open **Chrome** and go to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in top‑right corner).
4. Click **"Load unpacked"** and select the folder containing the extension files.
5. The extension icon will appear in your toolbar.

---

## 🚀 Usage

- **Single click** – toggle clean/restore on the current page (only if Active Mode is OFF).
- **Double click** – toggle Active Mode ON/OFF (state is saved).
- When Active Mode is **ON**, every CDMS page you visit will be cleaned automatically.
- To **stop auto‑cleaning**, double‑click the icon again (Active Mode OFF, page restored).

---

## ⚙️ Technical Details

- **Active Mode** uses `chrome.storage.local` to remember the state even after closing the browser.
- The content script listens for `active_mode_toggle` messages from the background script.
- On page load, the content script checks the stored Active Mode and runs `cleanCDPage()` if needed.

---

## 🛠️ Customization

You can modify the list of texts to hide inside `content.js`:

```javascript
const textsToHide = [
  "CDMS স্বয়ংক্রিয় ভাবে তৈরী খসড়া রিপোর্ট (CD) , এখনো পরিবর্তন যোগ্য, CD চূড়ান্ত করে প্রিন্ট করুন。"
];
