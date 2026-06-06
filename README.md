<div align="center">

# RSL Summon Rush Calculator

### Raid: Shadow Legends Shard Planning Tool

A calculator for **Raid: Shadow Legends** players who want to plan Summon Rush events quickly. Set a point target, enter your Sacred, Primal, Void, Ancient, and Mystery shard counts, and instantly see total points, remaining points, and goal progress in a responsive dark-fantasy interface.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Now-2ea44f?style=for-the-badge)](https://summon-rush-calculator.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Deployed-000?style=for-the-badge&logo=vercel&logoColor=white)](https://summon-rush-calculator.vercel.app/)

</div>

---

## Preview

<p align="center">
  <img src="./public/preview.png" alt="RSL Summon Rush Calculator preview" width="1000" />
</p>

> **Live Site:** [https://summon-rush-calculator.vercel.app/](https://summon-rush-calculator.vercel.app/)

---

## Features

| Feature                   | Description                                                                                 |
| :------------------------ | :------------------------------------------------------------------------------------------ |
| **Summon Rush target**    | Set a custom event point target, with `3,000` points used as the default goal.              |
| **Five shard types**      | Calculates points for Sacred, Primal, Void, Ancient, and Mystery shards.                    |
| **Live point totals**     | Updates total points, remaining points, and target status immediately as quantities change. |
| **Progress bar**          | Visual progress indicator shows how close the current shard plan is to the goal.            |
| **Increment controls**    | Add or subtract shard quantities with dedicated plus and minus buttons.                     |
| **Direct quantity input** | Type shard counts manually with numeric-only input handling.                                |
| **Reset action**          | Clear all shard quantities in one click while keeping the selected target.                  |
| **Persistent planning**   | Saves target, quantities, and calculator state in `localStorage`.                           |
| **RSL-themed visuals**    | Uses shard artwork, glow effects, dark UI styling, and responsive cards.                    |
| **Mobile-ready layout**   | Optimized for phone, tablet, desktop, and wide-screen layouts.                              |

---

## Tech Stack

<div align="center">

|     Technology     | Purpose                                                    |
| :----------------: | :--------------------------------------------------------- |
|   **Next.js 16**   | App framework, routing, metadata, and image optimization   |
|    **React 19**    | Interactive calculator UI and state management             |
|  **TypeScript 5**  | Type-safe components, data models, and app code            |
| **Tailwind CSS 4** | Utility-first styling, responsive layout, and theme tokens |
|  **Lucide React**  | Icons for controls, summary cards, and visual actions      |
|   **next/image**   | Optimized shard and header image rendering                 |
|  **localStorage**  | Client-side persistence for calculator state               |
|     **Vercel**     | Production hosting and deployment                          |

</div>

## Calculator Logic

Default shard values are defined in `src/lib/shards.ts`:

| Shard         | Points Each |
| :------------ | ----------: |
| Sacred Shard  |         500 |
| Primal Shard  |         200 |
| Void Shard    |         120 |
| Ancient Shard |          20 |
| Mystery Shard |           1 |

The main calculator computes:

```text
total points = sum(shard quantity * shard point value)
remaining points = max(0, target points - total points)
progress = min(100%, total points / target points)
```

---

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app:

```text
http://localhost:3000
```

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

Lint the project:

```bash
npm run lint
```

<div align="center">

**Made for Raid: Shadow Legends players who want a faster Summon Rush plan.**

Built with Next.js, React, TypeScript, Tailwind CSS, Lucide React, and Vercel.

</div>
