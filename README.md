# Bite Share

Bite Share is a frontend-only minimal prototype for splitting a night out with
friends. Add people, add items, assign who shared each item, and optionally enter
the final total with tax and tip.

The current prototype uses:
- Next.js App Router frontend (`frontend/`)
- Tailwind CSS, shadcn-style UI primitives, and Zustand state
- A local split algorithm in `frontend/src/lib/bill`


## Quickstart

1. Start the frontend:

```bash
docker compose up --build
```

2. Open the app:
- Frontend: `http://localhost:3000`

3. Set up local frontend development outside Docker, if desired:
- `cd frontend && pnpm install`
- `pnpm dev`


## What Works Out Of The Box

- Frontend serves the single-page prototype from `frontend/src/app/page.tsx`.
- Bill state stays in the browser session and starts with a default `Me` person.
- Money entry uses cents-keypad behavior for faster receipt entry.
- Person, item, and split details open in modals.
- Split calculation runs locally in `frontend/src/lib/bill`.
- No backend, database, receipt upload, authentication, or external API is
  required for the current prototype.


## UI Components

Shared UI components live under `frontend/src/components`. Generated shadcn
primitives live under `frontend/src/components/ui`.

From `frontend/`:

```bash
pnpm dlx shadcn@latest add component-name
```

Add shadcn components incrementally instead of generating a large UI set up
front.


## Production Note

Production deployment targets Railway. The current deployable unit is the
frontend service built from `frontend/Dockerfile`.
