# Data

Bite Share currently uses a frontend-only prototype flow. The browser owns the
temporary bill state and the frontend split algorithm calculates shares locally.

MongoDB, Redis, authentication, receipt upload, and backend APIs are future work.


## Environment Mapping

- No environment variables are required for the current prototype.


## Data Ownership

- Frontend state owns people, items, assignments, and optional final total during
  the prototype session.
- `frontend/src/lib/split_algorithm` owns split calculation logic.
- Future backend services may own persistence, authentication, receipt parsing,
  and shared bill workflows.


## Local Development

- Docker Compose service `frontend` runs the Next.js app.
- No local database, cache, backend service, or external API is required.
