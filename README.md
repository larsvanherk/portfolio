# VANHERK Portfolio

## Getting started

Requires Node.js 22.22+ (or 24.15+).

**Setting up your local development environment:**
```bash
$ nvm use 22
$ npm install
$ npm run dev
```

**Building for production (static site):**
```bash
$ nvm use 22
$ npm install
$ npm run generate
$ npx serve .output/public   # optional local preview
```

The site is fully prerendered; deploy the contents of `.output/public` as static assets.

## Tech stack
This project uses Vue.js and Nuxt 4, styled with Tailwind CSS 4 (via `@tailwindcss/vite`).
Brand tokens (e.g. the `primary` colour) live in `app/assets/styles/tailwind.css` under `@theme`.
