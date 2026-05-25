#!/usr/bin/env bash

set -euo pipefail

DEFAULT_TOKEN="project-template"

usage() {
  cat <<'EOF'
Usage: ./init_template.sh <project-slug>

Slug requirements:
- lowercase letters, numbers, and hyphens only
- no leading or trailing hyphen
EOF
}

validate_slug() {
  local slug="$1"
  if [[ ! "$slug" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
    echo "Invalid slug: $slug" >&2
    usage
    exit 1
  fi
}

is_skipped_file() {
  local file_path="$1"
  case "$file_path" in
    *.png|*.jpg|*.jpeg|*.gif|*.webp|*.ico|*.pdf|*.woff|*.woff2|*.ttf|*.eot|*.pyc|*.pyo|*.so|*.dylib|*.zip|*.gz|*.tar|*.tgz|*.jar|*.mp4|*.mov)
      return 0
      ;;
    *)
      return 1
      ;;
  esac
}

replace_token() {
  local root_dir="$1"
  local project_slug="$2"
  local scanned=0
  local updated=0

  while IFS= read -r -d '' file_path; do
    scanned=$((scanned + 1))

    if is_skipped_file "$file_path"; then
      continue
    fi

    if [[ "$file_path" == "$root_dir/init_template.sh" ]]; then
      continue
    fi

    if ! grep -Iq . "$file_path"; then
      continue
    fi

    if ! grep -q "$DEFAULT_TOKEN" "$file_path"; then
      continue
    fi

    sed -i '' "s/$DEFAULT_TOKEN/$project_slug/g" "$file_path"
    updated=$((updated + 1))
  done < <(
    find "$root_dir" \
      -path "$root_dir/.git" -prune -o \
      -path "$root_dir/.next" -prune -o \
      -path "$root_dir/.venv" -prune -o \
      -path "$root_dir/node_modules" -prune -o \
      -path "$root_dir/__pycache__" -prune -o \
      -path "$root_dir/backend/.venv" -prune -o \
      -path "$root_dir/frontend/.next" -prune -o \
      -path "$root_dir/frontend/node_modules" -prune -o \
      -type f -print0
  )

  echo "Scanned $scanned files"
  echo "Updated $updated files"
}

main() {
  if [[ $# -ne 1 ]]; then
    usage
    exit 1
  fi

  local project_slug="$1"
  validate_slug "$project_slug"

  if [[ "$project_slug" == "$DEFAULT_TOKEN" ]]; then
    echo "Project slug matches template token; nothing to replace."
    exit 0
  fi

  local root_dir
  root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

  replace_token "$root_dir" "$project_slug"
}

main "$@"
