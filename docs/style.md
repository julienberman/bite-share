# Style

This document defines naming, formatting, and code-organization conventions.


## Naming

- Use `snake_case` for files, directories, functions, variables, and module names.
- Use `PascalCase` for class names.
- Use `UPPER_SNAKE_CASE` for constants.
- Keep names concise and descriptive.


## Backend Python Style

- Follow PEP8 wherever possible.
- Use spaces, not tabs.
- Keep lines at or below 79 characters when practical.
- Current backend is a flat scaffold rooted in `backend/`.
- Keep runtime wiring in `backend/app/` and add domain modules as top-level
  packages when implementation begins.
- Keep route handlers thin and delegate behavior to services.
- Add comments only when a non-obvious block requires explanation.


## Frontend TypeScript Style

- Use path alias `@/*` mapped to `frontend/src/*`.
- Keep feature code under `frontend/src/features/<feature_name>` when features
  are introduced.
- Keep shared UI under `frontend/src/components`.
- Keep shared framework wrappers under `frontend/src/lib`.
- Prefer explicit imports over barrel exports.


## Tailwind CSS Style

- Use Tailwind CSS v4 via `frontend/src/app/globals.css` and PostCSS plugin.
- Prefer utility classes directly in components for simple styling.
- Extract shared visual primitives into `frontend/src/components/ui` when class
  sets repeat.
- Keep color and typography tokens in CSS custom properties in
  `frontend/src/app/globals.css`.


## Comments
- *CRITICAL*: Avoid comments unless the user specifically requests an override.
