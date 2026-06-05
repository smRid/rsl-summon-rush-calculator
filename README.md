# ⚔️ Summon Rush Calculator

A sleek, dark-fantasy utility tool for **Raid: Shadow Legends** players to plan their Summon Rush shard usage and hit point targets with precision.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

- 🔮 **5 default shard types** — Sacred, Primal, Void, Ancient, Mystery
- ➕ **Custom shard support** — add your own shard name and point value
- 📊 **Live progress bar** — updates instantly as you adjust quantities
- 💾 **LocalStorage persistence** — your setup survives page refreshes
- 📋 **Copy result** — one-click summary to share with your guild
- 🗑️ **Reset all** — clear quantities in one click
- 📱 **Fully responsive** — mobile, tablet, and desktop layouts

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org) | App framework (App Router) |
| [TypeScript](https://typescriptlang.org) | Type safety |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling |
| [Lucide React](https://lucide.dev) | Icons |
| `localStorage` | Client-side persistence |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout + metadata
│   ├── page.tsx            # Entry page
│   └── globals.css         # Global styles & theme
├── components/
│   ├── SummonRushCalculator.tsx  # Main calculator logic & UI
│   ├── ShardCard.tsx             # Individual shard card
│   └── SummaryCard.tsx           # Stats summary card
└── lib/
    ├── shards.ts           # Default shard data
    └── utils.ts            # cn() class merge utility
```

## 🏗️ Build for Production

```bash
npm run build
npm start
```

---

Made with ❤️ by **Omor Riduan**
