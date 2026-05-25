FROM python:3.11-slim

RUN pip install --no-cache-dir uv

WORKDIR /app

ENV UV_LINK_MODE=copy

COPY pyproject.toml uv.lock ./
RUN --mount=type=cache,id=s/d1dde6e1-6971-4ed4-8f6d-27f890346968-/root/.cache/uv,target=/root/.cache/uv \
    uv sync --frozen --no-install-project

COPY . /app

CMD ["uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
