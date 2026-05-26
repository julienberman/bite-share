# Commands

Commands must be run from the repository root.


## Validation Policy

- Docker Compose is the required execution path for repository-level validation
  commands.
- Run frontend lint, typecheck, and format checks through the frontend service
  container when validating the full local setup.


## Bootstrap

- `docker compose up --build` starts the frontend.
- `docker compose down` stops and removes stack containers.


## Testing

- Automated tests are intentionally not wired into CI for the prototype phase.
- Run focused local tests manually when adding test coverage in a future work
  item.


## Lint

- `docker compose run --rm frontend pnpm lint` runs frontend lint checks.


## Type Check

- `docker compose run --rm frontend pnpm typecheck` runs frontend TypeScript
  checks (`tsc --noEmit`).


## Format

- `docker compose run --rm frontend pnpm format:check` runs frontend format
  checks.


## Build

- `docker compose build frontend` builds the frontend image.


## Infrastructure And Utilities

- `docker compose logs -f frontend` tails frontend container logs.
- `docker compose exec frontend pnpm lint` runs frontend lint inside an
  already-running frontend container.
