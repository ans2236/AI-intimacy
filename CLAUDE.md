# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static, no-build scrollytelling visualization page that displays survey data about student interactions with AI. It uses an Art Deco aesthetic with a dark green/gold palette.

## Running the Project

No build step required — this is a pure static site. Serve it with any static file server from the repo root:

```bash
npx serve .
# or
python3 -m http.server 8080
```

The page must be served (not opened as `file://`) because `scripts.js` fetches the CSV via `Papa.parse()` with `download:true`, which requires HTTP.

## Architecture

**Three files, no framework:**
- `index.html` — layout with a sticky sidebar (`.scroller`) and a sticky visualization panel (`.graphic`)
- `scripts.js` — all logic in one IIFE; loads CSV, drives D3 charts, wires `IntersectionObserver` for scroll steps
- `styles.css` — Art Deco design tokens via CSS custom properties (`--bg`, `--gold`, `--accent`, etc.)

**Data flow:**
1. On load, `boot()` fetches `assets/data/sample-data.csv` via PapaParse
2. `wireSteps(rows)` attaches an `IntersectionObserver` to each `.step[data-step]` element
3. When a step enters the viewport, `showStep(i, rows)` renders the appropriate D3 visualization into `#viz`

**Four scroll steps (0–3):**
- Step 0: Raw responses list (first 10 rows)
- Step 1: Horizontal bar chart — conversation frequency column
- Step 2: Radial gauge — numeric emotional response average
- Step 3: Horizontal bar chart — memory alignment column

**Dependencies (CDN only, no npm):**
- D3.js v7 (`d3.v7.min.js`)
- PapaParse 5.4.1
- Google Fonts: Cinzel (serif), Montserrat (sans-serif)

## Key Conventions

- Column names in `scripts.js` match CSV headers exactly (long survey question strings) — update `STEP_BAR_COLS` if the CSV schema changes.
- `drawBarD3` and `drawGaugeD3` both call `vizEl.html('')` to clear before redrawing.
- There is a duplicate `handleBarOver`/`handleBarMove`/`handleBarOut` definition in `scripts.js` (lines ~197–213 and ~230–241); the second definitions shadow the first.
- Responsive resize is debounced at 160 ms and re-calls `showStep` with the cached `currentRows`.
