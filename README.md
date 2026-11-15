# Dynamic Metal Storefront

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D16-brightgreen.svg)]()
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)]()

An open‑source, **React + TypeScript** storefront template built for precious‑metal retailers. Live market data drives a dynamic pricing engine that supports gold (24K/22K/18K) and silver with optional gemstone value, making charges, and a 3% GST surcharge.

---

## Features

| Feature | Description |
|---------|-------------|
| **Live Rate Ticker** | Interactive component showing current market rates for 24K, 22K, 18K gold, and silver. Includes a manual override panel for testing. |
| **Dynamic Product Catalog** | Products are described by weight (grams), purity multiplier, making charges, gemstone value. Prices are recalculated on‑the‑fly and displayed with an expandable price‑breakdown modal. |
| **Shopping Cart & Checkout** | Full cart flow, subtotal/total calculations, and a checkout summary page. No external e‑commerce backend – state is kept locally with React Context. |
| **AI Gift‑Note Generator** | Optional component that uses a configured LLM API key (`API_KEY` in `.env`) or a local mock fallback to produce a personalized gift note. |
| **Tailwind CSS** | Utility‑first styling with dark mode support and responsive layout. |
| **TypeScript** | Strict typing throughout the codebase. |
| **Component‑first architecture** | Small, testable React components. |

---

## Pricing Formula

For every product the final price is calculated as:

```
finalPrice = (weight * purityMultiplier + makingCharges + gemstoneValue) * 1.03
```

* `weight` – grams (e.g., 10 g)
* `purityMultiplier` – 24 K → 1.0, 22 K → 0.9167, 18 K → 0.75
* `makingCharges` – flat fee (e.g., 50 USD)
* `gemstoneValue` – optional value for added gems
* 3 % GST added at the end (as specified by `* 1.03`). |

The component `ProductCatalog` demonstrates this calculation and renders a breakdown when the user expands the modal.

---

## Local Setup

```bash
# 1. Clone repository (after this action you can set remote)
# 2. Install dependencies
npm i
# 3. Run the dev server
npm run dev
```

The app is served at `http://localhost:5173` by default.

### Environment Variables

Copy `.env.example` to `.env` and set the values. The only required variable is an optional `API_KEY` used by the AI gift‑note generator.

### Build

```bash
npm run build
```

A production build will be available in the `dist/` folder.

---

## Repository Structure

```
├── public/                 # Static assets (index.html, icons)
├── src/                   # Source code
│   ├── components/       # Reusable UI components
│   │   ├── RateTicker.tsx
│   │   ├── ProductCatalog.tsx
│   │   ├── Cart.tsx
│   │   ├── AiGiftNote.tsx
│   │   └── ...
│   ├── context/          # React context (cart, rates)
│   ├── App.tsx
│   └── main.tsx
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── tsconfig.json
├── .env.example
├── README.md
├── LICENSE
├── .gitignore
├── CONTRIBUTING.md
└── CHANGELOG.md
```

---

## Contributing

We welcome pull requests, feature suggestions, bug reports, and documentation improvements. Please refer to the [CONTRIBUTING](CONTRIBUTING.md) guide for details.

---

## License

This project is released under the [MIT License](LICENSE). © 2026 Dilpreet Jaura
