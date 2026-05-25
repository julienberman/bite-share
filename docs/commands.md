# Commands

Commands must be run from the repository root.


## Validation Policy

- Docker Compose is the required execution path for validation commands.
- Run lint, typecheck, tests, and format checks through service containers.
- If validation fails due to missing environment variables, report missing keys
  instead of patching app defaults.


## Bootstrap

- `cp .env.example .env` creates local environment configuration.
- `docker compose up --build` starts database, redis, backend, and frontend.
- `docker compose down` stops and removes stack containers.


## Testing

- `docker compose run --rm backend uv run pytest tests` runs backend tests.
- Frontend test scaffolding exists under `frontend/tests/` and is not yet wired
  into a frontend package script.


## Lint

- `docker compose run --rm frontend pnpm lint` runs frontend lint checks.
- `docker compose run --rm backend uv run ruff check .` runs backend lint
  checks.


## Type Check

- `docker compose run --rm frontend pnpm typecheck` runs frontend TypeScript
  checks (`tsc --noEmit`).
- `docker compose run --rm backend uv run mypy app` runs backend type checks.


## Format

- `docker compose run --rm frontend pnpm format:check` runs frontend format
  checks.
- `docker compose run --rm backend uv run ruff format --check .` runs backend
  format checks.


## Build

- `docker compose build frontend` builds frontend image from the shared
  multi-stage Dockerfile.
- `docker compose build backend` builds backend image.


## Infrastructure And Utilities

- `docker compose logs -f backend` tails backend container logs.
- `docker compose logs -f frontend` tails frontend container logs.
- `docker compose logs -f database` tails MongoDB container logs.
- `docker compose logs -f redis` tails Redis container logs.
- `docker compose exec backend uv run pytest tests` runs backend tests inside
  an already-running backend container.
- `docker compose exec frontend pnpm lint` runs frontend lint inside an
  already-running frontend container.
