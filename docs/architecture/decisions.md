# Decisions

## 2026-05-25 - Build stateless receipt splitting prototype

The first working version is a single-page prototype without authentication or
database persistence. The frontend owns temporary bill state, UploadThing stores
receipt images, OpenAI extracts receipt line items, and FastAPI owns receipt
parsing and split calculation endpoints.

This keeps the prototype small while preserving a clear backend boundary for
domain logic. Clerk authentication and MongoDB persistence remain future work.

## [DATE] - Initialize project from project template 

