# Data

Bite Share currently uses a stateless prototype flow. The frontend holds the
working bill state, UploadThing stores receipt image uploads, OpenAI extracts
receipt data from uploaded image URLs, and the backend calculates splits from
request payloads.

MongoDB and Redis remain available in the local stack for future persistence,
cache, and queue workflows.


## Environment Mapping

- `DATABASE_URL`: MongoDB connection string used by backend runtime.
- `DATABASE_NAME`: MongoDB database name used by backend runtime.
- `REDIS_URL`: Redis connection string reserved for cache or queue workflows.
- `FRONTEND_ORIGIN`: allowed browser origin for backend CORS.
- `NEXT_PUBLIC_API_URL`: frontend browser URL for the FastAPI backend.
- `OPENAI_API_KEY`: server-side OpenAI API key for receipt extraction.
- `OPENAI_MODEL`: OpenAI model used by receipt extraction.
- `UPLOADTHING_TOKEN`: UploadThing token used by the Next.js upload route.


## Data Ownership

- Frontend state owns the temporary bill during the prototype session.
- UploadThing stores receipt image files and returns URLs to the frontend.
- OpenAI receives uploaded receipt image URLs and returns structured items.
- Backend `Bill.split()` owns split calculation logic.
- MongoDB is reserved for future bill persistence and receipt metadata.
- Redis stores transient data only, such as cache entries, short-lived locks,
  and queue state.


## Local Development

- Docker Compose service `database` runs MongoDB on the internal Compose network.
- Docker Compose service `redis` runs Redis on the internal Compose network.
- Backend receives all data service configuration from `.env`.
