# AutoOpacityCleanerExtension

A Chrome extension that toggles the opacity of all webpage elements to full visibility and hides specific elements on click — ideal for cleaning cluttered interfaces. Clicking again restores the page to its original state.

---

## ✨ Features

- Sets opacity of all elements to `1.0`.
- Hides specific warning texts and buttons (e.g., **"Confirm CD"**).
- **Toggle functionality**: click once to clean, click again to restore.
- Lightweight and fast — runs as a content script when the extension icon is clicked.

---

## 📦 Files Included

- `manifest.json` – Extension configuration.
- `content.js` – Main logic for toggling page clean/restore.
- `background.js` – Background script for handling clicks.

---

## 🔧 Installation

1. Download or clone this repository.
2. Open **Chrome** and go to `chrome://extensions/`.
3. Enable **Developer mode** (top right).
4. Click **"Load unpacked"** and select the folder containing the extension files.
5. Click the extension icon to clean or restore the page.

---

## 🛠 How It Works

### On first click:
- Sets opacity of all elements to `1.0`.
- Hides specific texts:
