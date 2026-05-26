# Directory Structure

This file provides the high-level tree for the repository.

```text
bite-share/
|-- AGENTS.md
|-- README.md
|-- compose.yml
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
`-- frontend/
    |-- Dockerfile
    |-- package.json
    |-- tsconfig.json
    |-- postcss.config.mjs
    |-- next.config.ts
    |-- src/
    |   |-- app/
    |   |   |-- globals.css
    |   |   |-- layout.tsx
    |   |   `-- page.tsx
    |   |-- components/
    |   |   |-- item.tsx
    |   |   |-- person.tsx
    |   |   |-- split_summary.tsx
    |   |   `-- ui/
    |   `-- lib/
    |       |-- split_algorithm/
    |       |   |-- bill.ts
    |       |   |-- index.ts
    |       |   `-- types.ts
    |       `-- utils.ts
```

## Directory Purpose

- `docs/`: project documentation and architecture standards.
- `frontend/`: Next.js app and frontend dependencies.
- `frontend/src/app/`: App Router layout, global CSS, and home page.
- `frontend/src/components/`: shared UI and feature components.
- `frontend/src/components/ui/`: shadcn-style primitives.
- `frontend/src/lib/`: shared frontend utilities and domain logic.
- `frontend/src/lib/split_algorithm/`: local bill split calculation.
- `compose.yml`: local frontend orchestration.

## Notes

- The current prototype intentionally has no backend service.
- Backend, database, cache, receipt parsing, and authentication are future work.
