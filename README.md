# Project Template

This repository is a full-stack template with a minimal working scaffold:
- Next.js frontend (`frontend/`)
- FastAPI backend (`backend/`)
- MongoDB database (`database` service in Docker Compose)
- Redis cache (`redis` service in Docker Compose)


## Quickstart

1. Use this template on GitHub and clone your new repository.
2. Run the rename script from the repository root:

```bash
./init_template.sh your-project-slug
```

3. Copy environment variables:

```bash
cp .env.example .env
```

4. Start the full stack:

```bash
docker compose up --build
```

5. Verify services:
- Frontend: `http://localhost:3000`
- Backend health: `http://localhost:8000/health`

6. Set up for local development (if desired):
- Frontend: `cd frontend && pnpm install`
- Backend: `cd backend && uv sync`

## Rename Guidance

This template uses the token `project-template` across package names, container
names, and docs.

- `init_template.sh` replaces `project-template` in text files with the
  slug you pass.
- It updates values like `project-template-backend` and
  `project-template-database` automatically.
- It skips common generated and binary paths.

Recommended slug format: lowercase letters, numbers, and hyphens.


## What Works Out Of The Box

- `docker compose up --build` launches database, redis, backend, and frontend.
- Frontend serves a minimal homepage from `frontend/src/app/page.tsx`.
- Backend serves `/health` from `backend/app/api/endpoints/health.py`.
- Backend runtime is configured with database-agnostic environment keys:
  `DATABASE_URL` and `DATABASE_NAME`.


## Clerk Variables

`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` are intentionally
kept in `.env.example` for future auth integration.

Auth is not wired in this scaffold yet.


## Boilerplate Generation

Shadcn components are generated only when needed.

From `frontend/`:

```bash
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card input form
```

Add components incrementally instead of generating a large UI set up front.


## Production Note

Production deployment targets Railway.

Frontend and backend are built and deployed as separate services using
`frontend/Dockerfile` and `backend/Dockerfile`.
