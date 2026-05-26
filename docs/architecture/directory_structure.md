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
    |   |   |-- item/
    |   |   |   |-- item.tsx
    |   |   |   `-- item_detail.tsx
    |   |   |-- person/
    |   |   |   |-- consumer_chip.tsx
    |   |   |   |-- consumer_detail.tsx
    |   |   |   `-- search_consumers.tsx
    |   |   |-- upload_panel.tsx
    |   |   `-- ui/
    |   |       `-- money_input.tsx
    |   `-- lib/
    |       |-- bill/
    |       |   |-- bill.ts
    |       |   |-- index.ts
    |       |   `-- types.ts
    |       |-- bill_store/
    |       |   `-- useBillStore.ts
    |       |-- uploadthing.ts
    |       `-- utils.ts
```

## Directory Purpose

- `docs/`: project documentation and architecture standards.
- `frontend/`: Next.js app and frontend dependencies.
- `frontend/src/app/`: App Router layout, global CSS, and home page.
- `frontend/src/components/`: shared UI and feature components.
- `frontend/src/components/ui/`: shadcn-style primitives.
- `frontend/src/components/ui/money_input.tsx`: cents-keypad currency input.
- `frontend/src/lib/`: shared frontend utilities and domain logic.
- `frontend/src/lib/bill/`: local bill split calculation and domain types.
- `frontend/src/lib/bill_store/`: temporary browser-session bill state.
- `frontend/src/lib/uploadthing.ts`: placeholder upload API shim for future receipt upload work.
- `compose.yml`: local frontend orchestration.

## Notes

- The current prototype intentionally has no backend service.
- Backend, database, cache, receipt parsing, and authentication are future work.
