# MVP Generator

Web wizard that builds a downloadable starter zip from your stack picks.

## What works

1. Open the app, pick **framework**, **auth**, **database**, and **styling**.
2. Click **Generate Project**.
3. Unzip, copy `.env.example` to `.env.local` (Next.js) or `.env` (Vite), fill keys, run `npm install` and `npm run dev`.

### Frameworks
- Next.js (App Router)
- Vite + React
- Remix
- React.js (Vite SPA)

### Authentication
- None, Clerk, Auth0, Firebase, Supabase

### Database
- None, Supabase, Firebase, MongoDB, Xata (`/api/db/ping` on Next/Remix; Vite/React also start a small Express API)

### Styling
- Tailwind CSS, Bootstrap (CDN), plain CSS

## Run this app

```bash
npm install
npm run dev
```

App: `http://localhost:3000`

## License

MIT
