# Directory Structure

This file provides the high-level tree for the repository.

```text
project-template/
|-- AGENTS.md
|-- README.md
|-- compose.yml
|-- .env.example
|-- .github/
|   `-- workflows/
|       `-- ci.yml
|-- docs/
|   |-- commands.md
|   |-- style.md
|   `-- architecture/
|       |-- data.md
|       |-- decisions.md
|       `-- directory_structure.md
|-- backend/
|   |-- app/
|   |   |-- api/
|   |   |   |-- endpoints/
|   |   |   `-- models/
|   |   |-- configs/
|   |   |-- data/
|   |   |-- exceptions/
|   |   |-- infra/
|   |   |-- init/
|   |   |-- main.py
|   |   `-- services/
|   |-- Dockerfile
|   |-- tests/
|   |   |-- integration/
|   |   `-- unit/
|   |-- pyproject.toml
|   `-- uv.lock
|-- frontend/
|   |-- Dockerfile
|   |-- package.json
|   |-- tsconfig.json
|   |-- postcss.config.mjs
|   |-- next.config.ts
|   |-- src/
|   |   |-- app/
|   |   |-- components/
|   |   |-- lib/
|   |   `-- types/
|   `-- tests/
|       `-- unit/
```

## Directory Purpose

- `docs/`: project documentation and architecture standards.
- `backend/`: backend runtime, lockfile, and container build.
- `backend/app/`: backend package root.
- `backend/app/api/`: FastAPI endpoints and Pydantic models.
- `backend/app/configs/`: runtime settings and environment parsing.
- `backend/app/infra/`: infrastructure adapters, including Mongo client setup.
- `backend/app/init/`: dependency-injection container scaffolding.
- `backend/tests/`: backend unit and integration test suites.
- `frontend/`: Next.js scaffold and frontend dependencies.
- `frontend/src/app/`: route composition and app-level layout/pages.
- `frontend/src/app/globals.css`: global CSS entrypoint and Tailwind import.
- `frontend/src/components/`: shared UI components.
- `frontend/src/lib/`: shared frontend utilities.
- `frontend/tests/`: frontend test scaffolding.
- `compose.yml`: local full-stack orchestration.

## Notes

- Docker Compose is the single entrypoint for local full-stack development.
