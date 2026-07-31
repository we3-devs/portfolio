# CyberSentinel Portfolio — Run Guide

## Dependencies

No `.env.local` or secret files needed. All configuration is in `next.config.ts`.

```bash
npm install
```

## ⚠️ Dev Server (Turbopack CSS Issue)

Next.js 16 uses Turbopack by default. There is a known PostCSS corruption issue with Tailwind v4 during HMR that causes 500 errors.

```bash
npx next dev -p 3000
```

**If you encounter CSS parsing errors in the dev server, use the production server instead (below).**

## ✅ Production Server (Recommended for Preview)

Build compiles cleanly — this is the reliable way to serve the site:

```bash
npm run build
npm run start
```

Server starts on http://localhost:3000.
