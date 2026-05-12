# "Different Kinds of Venting"
### AI & Emotional Support Among College Students

A scrollytelling op-ed visualization exploring how college students use generative AI models like ChatGPT and Claude for emotional support, venting, and personal guidance — in lieu of friends or traditional therapy.

---

## How to Run

This is a **static site** with no build step. You just need to serve the files over HTTP (opening `index.html` directly as a `file://` URL won't work because Chart.js and fonts load from CDN).

### Option 1 — Python (no install needed)

```bash
python3 -m http.server 8080
```

Then open **http://localhost:8080** in your browser.

### Option 2 — Node / npx

First install Node.js from [nodejs.org](https://nodejs.org) if you don't have it. Then:

```bash
npx serve .
```

Then open the URL it prints (usually **http://localhost:3000**).

### Option 3 — VS Code Live Server

If you use VS Code, install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), right-click `index.html`, and choose **Open with Live Server**.

---

## Stopping the Server

If you used Python:

```
Ctrl + C
```

---

## Project Structure

```
.
├── index.html      # Article layout + figure slots
├── scripts.js      # Chart data, participant clusters, scroll animations
├── styles.css      # Editorial typography and component styles
└── assets/
    └── data/       # (legacy data folder)
```

**No npm, no build tools, no frameworks.** Dependencies are loaded from CDN:
- [Chart.js 4.4](https://www.chartjs.org/) — bar charts and doughnuts
- [DM Serif Display + DM Sans](https://fonts.google.com/) — Google Fonts

