# Crisistance

Crisis management solutions tailored for small businesses.

**Live site:** [https://crisistance.com](https://crisistance.com)  
**Preview:** [https://crisis-preparedness-hub.lovable.app](https://crisis-preparedness-hub.lovable.app)

## Overview

Crisistance helps small businesses prepare for, respond to, and recover from crises. The site includes service information, a resource library, multilingual support, and a guided "Get Started" intake flow.

## Tech Stack

- **Framework:** [Vite](https://vitejs.dev/) + [React 18](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Backend / Auth:** [Lovable Cloud](https://docs.lovable.dev/features/cloud) (Supabase)
- **Internationalization:** [react-i18next](https://react.i18next.com/)
- **Analytics:** Google Analytics 4
- **Package Manager:** `bun` (or `npm`)

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (LTS recommended)
- [Bun](https://bun.sh/) (preferred) or `npm`
- A Lovable Cloud / Supabase project (for backend features)

## Getting Started

### 1. Clone the repository

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

### 2. Install dependencies

With Bun:

```sh
bun install
```

With npm:

```sh
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```sh
cp .env.example .env
```

Then fill in the values from your Lovable Cloud / Supabase project settings:

```env
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<your-anon-public-key>
VITE_SUPABASE_PROJECT_ID=<your-project-ref>
```

> **Note:** `VITE_SUPABASE_PUBLISHABLE_KEY` is a public (anon) key and is safe to expose in the frontend bundle. Row Level Security (RLS) protects your data. Never commit secrets such as service-role keys or SMTP passwords.

### 4. Start the development server

```sh
bun run dev
```

The app will be available at [http://localhost:8080](http://localhost:8080).

## Available Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start the Vite dev server on port 8080 |
| `bun run build` | Create an optimized production build |
| `bun run build:dev` | Create a development build |
| `bun run preview` | Preview the production build locally |
| `bun run lint` | Run ESLint across the project |

The `dev` and `build` scripts automatically regenerate `public/sitemap.xml` via `scripts/generate-sitemap.ts`.

## Building for Production

### Local production preview

```sh
bun run build
bun run preview
```

`preview` serves the contents of `dist/` on a local Vite server.

### Deploying via Lovable

The recommended way to deploy this project is through Lovable:

1. Open the project in [Lovable](https://lovable.dev/projects/0859d2ff-543e-4abf-bf14-749723cbc866).
2. Click **Share → Publish**.
3. Lovable will build and deploy the site automatically.

You can also connect a custom domain under **Project Settings → Domains**.

## Project Structure

```text
.
├── public/              # Static assets (favicon, sitemap, robots.txt)
├── scripts/             # Build helpers (sitemap generator)
├── src/
│   ├── components/        # Reusable UI components
│   ├── contexts/        # React context providers
│   ├── hooks/           # Custom React hooks
│   ├── i18n/            # Translation files (EN / FR-CA)
│   ├── integrations/    # Third-party integrations (Supabase client)
│   ├── lib/             # Utility functions
│   ├── pages/           # Route-level page components
│   ├── App.tsx          # Main application router
│   └── main.tsx         # Application entry point
├── supabase/
│   ├── functions/       # Edge functions (email, surveys, etc.)
│   ├── migrations/      # Database schema migrations
│   └── config.toml      # Supabase CLI configuration
├── index.html           # HTML entry point + meta tags
├── package.json         # Dependencies and scripts
├── tailwind.config.ts   # Tailwind theme configuration
└── vite.config.ts       # Vite configuration
```

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SUPABASE_URL` | Yes | Your Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Yes | Your Supabase public (anon) API key |
| `VITE_SUPABASE_PROJECT_ID` | Yes | Your Supabase project reference ID |

Server-side secrets (for Supabase Edge Functions) are managed through Lovable Cloud and are not stored in this repository.

## Features

- **Multilingual support:** English and Canadian French via JSON locale files.
- **Resource library:** Curated crisis-management resources by category.
- **Get Started flow:** Multi-step survey for prospective clients.
- **Email notifications:** Admin alerts sent via Supabase Edge Function.
- **SEO:** Sitemap generation, semantic headings, meta tags, and robots.txt.
- **Analytics:** Google Analytics 4 page-view tracking.

## Contributing

1. Create a feature branch.
2. Make your changes.
3. Run `bun run lint` to check for issues.
4. Open a pull request.

If you are editing through Lovable, changes are automatically committed and synced back to this repository.

## License

Copyright © Crisistance. All rights reserved.
