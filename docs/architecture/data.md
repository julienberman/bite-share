# Data

This template uses MongoDB as the primary application datastore and Redis as an
ephemeral cache service.


## Environment Mapping

- `DATABASE_URL`: MongoDB connection string used by backend runtime.
- `DATABASE_NAME`: MongoDB database name used by backend runtime.
- `REDIS_URL`: Redis connection string reserved for cache or queue workflows.


## Data Ownership

- MongoDB stores application entities, document records, and metadata.
- Redis stores transient data only, such as cache entries, short-lived locks,
  and queue state.


## Local Development

- Docker Compose service `database` runs MongoDB on the internal Compose network.
- Docker Compose service `redis` runs Redis on the internal Compose network.
- Backend receives all data service configuration from `.env`.
