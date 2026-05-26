# Decisions

## 2026-05-25 - Narrow MWP to frontend-only bill splitting

The minimal working prototype is a frontend-only manual bill splitter. Users add
people and items, assign consumers to each item, optionally enter the final total,
and the browser calculates the split locally.

This removes backend, receipt upload, LLM parsing, authentication, database, and
cache requirements from the current prototype so the first working version stays
small and reliable. Those services remain future work.

## 2026-05-25 - Build stateless receipt splitting prototype

Superseded by the frontend-only MWP decision above.

The first working version is a single-page prototype without authentication or
database persistence. The frontend owns temporary bill state, UploadThing stores
receipt images, OpenAI extracts receipt line items, and FastAPI owns receipt
parsing and split calculation endpoints.

This keeps the prototype small while preserving a clear backend boundary for
domain logic. Clerk authentication and MongoDB persistence remain future work.

## [DATE] - Initialize project from project template 
