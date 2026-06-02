# CarbonTool

A real estate carbon performance and CRREM pathway analysis tool built with React.

**Live demo:** [https://carbontool-gilt.vercel.app/]

---

## What it does

CarbonTool helps real estate portfolio managers assess their buildings against CRREM (Carbon Risk Real Estate Monitor) decarbonisation pathways. Key features:

- **Portfolio management** — upload and manage buildings across multiple countries and asset classes
- **Energy data** — import monthly energy consumption by fuel type
- **CRREM analysis** — compare each building's carbon intensity against the 1.5°C pathway, identifying stranding year and exceedance
- **Dashboard** — portfolio-wide charts, map view (OpenStreetMap), and KPI scorecards
- **Retrofit modeller** — model the carbon and cost impact of interventions

---

## Tech stack

- **React 18** + **Vite**
- **Recharts** — charting
- **Leaflet** — interactive map (loaded from CDN)
- **PapaParse** — CSV import/export
- **Lucide React** — icons
- CRREM V2.04 pathway data bundled inline (no external fetch required)

---

## Running locally

```bash
npm install
npm run dev
```

## Building for production

```bash
npm run build
```

Output goes to `dist/`. Fully static — no server required.

---

## Deploying to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Vercel auto-detects Vite — click **Deploy**
4. Live URL in ~60 seconds

---

## Data sources

CRREM pathway and grid emission factor data from the Carbon Risk Real Estate Monitor (CRREM), V2.04 (28 August 2025). [www.crrem.org](https://www.crrem.org)
