# Bite Share

Bite Share is a simple prototype for splitting a night out with friends. A user
uploads receipt images, an LLM extracts receipt items, the user corrects the
items and assigns people to what they consumed, and the backend calculates the
split.

The current prototype uses:
- Next.js App Router frontend (`frontend/`)
- FastAPI backend (`backend/`)
- UploadThing for receipt image upload
- OpenAI vision for receipt extraction
- MongoDB and Redis services reserved for future persistence and cache work


## Quickstart

1. Copy environment variables:

```bash
cp .env.example .env
```

2. Fill in required local secrets in `.env`:
- `OPENAI_API_KEY`
- `UPLOADTHING_TOKEN`

3. Start the full stack:

```bash
docker compose up --build
```

4. Verify services:
- Frontend: `http://localhost:3000`
- Backend health: `http://localhost:8000/health`

5. Set up for local development outside Docker, if desired:
- Frontend: `cd frontend && pnpm install`
- Backend: `cd backend && uv sync`


## What Works Out Of The Box

- `docker compose up --build` launches database, redis, backend, and frontend.
- Frontend serves the single-page prototype from `frontend/src/app/page.tsx`.
- UploadThing receives receipt image uploads at `/api/uploadthing`.
- Backend serves `/receipts/parse` for OpenAI receipt extraction.
- Backend serves `/bills/split` for bill split calculation.
- Backend serves `/health` for service health.


## Clerk Variables

`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` are intentionally
kept in `.env.example` for future auth integration.

Auth is not wired in this scaffold yet.


## UI Components

Shared UI components live under `frontend/src/components`. Generated shadcn
components live under `frontend/src/components/ui`.

From `frontend/`:

```bash
pnpm dlx shadcn@latest add component-name
```

Add shadcn components incrementally instead of generating a large UI set up
front.


## Production Note

Production deployment targets Railway.

Frontend and backend are built and deployed as separate services using
`frontend/Dockerfile` and `backend/Dockerfile`.
