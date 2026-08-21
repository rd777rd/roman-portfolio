# Roman Drake — Portfolio

Personal portfolio for Roman Drake, an AI-assisted full-stack web application developer.
Showcases projects (with live per-repo GitHub stats), skills, and certifications.

**Live site:** https://romanportfolio1.netlify.app/

## Tech Stack
- React 19 + Vite
- Tailwind CSS v4 (compiled via `@tailwindcss/vite` — no CDN, real build step)
- TypeScript
- Framer Motion (`motion`) for animation
- FormSubmit.co for contact/hire-me form delivery (no backend needed)
- Netlify (hosting)

## Running locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build   # outputs to dist/
npm run preview # preview the production build locally
```

`dist/` is gitignored and shouldn't be committed — Netlify builds it fresh from `netlify.toml`'s
`npm run build` command on every deploy.

## Linting & formatting
```bash
npm run lint    # eslint + tsc --noEmit
npm run format  # prettier --write .
```

## Contact forms
Both the Contact section and the "Hire Me" modal submit to FormSubmit.co via AJAX
(`https://formsubmit.co/ajax/<email>`) — no backend or API key required. A hidden honeypot field
(`_honey`) is included on both forms for basic spam protection.
