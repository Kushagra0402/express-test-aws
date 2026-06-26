#!/bin/bash
set -e

# Default DB host/port if DATABASE_URL not present
DB_HOST="postgres"
DB_PORT="5432"

# Try to parse host and port from DATABASE_URL if set
if [ -n "$DATABASE_URL" ]; then
  # extract host between @ and : or /
  parsed_host=$(echo "$DATABASE_URL" | sed -E 's#.*@([^:/]+).*#\1#')
  parsed_port=$(echo "$DATABASE_URL" | sed -E 's#.*:([0-9]+)/.*#\1#')
  if [ -n "$parsed_host" ]; then
    DB_HOST="$parsed_host"
  fi
  if [ -n "$parsed_port" ]; then
    DB_PORT="$parsed_port"
  fi
fi

echo "Waiting for database $DB_HOST:$DB_PORT..."

# wait for TCP port to be open
while ! nc -z "$DB_HOST" "$DB_PORT" >/dev/null 2>&1; do
  sleep 1
done

echo "Database is available — running Prisma migrations (deploy)..."
# Apply existing migrations in a non-interactive way.
# This requires that migration files already exist in prisma/migrations.
if npm run prisma:migrate:deploy --silent; then
  echo "Migrations complete."
else
  echo "Prisma migrate deploy failed with non-zero status."
  exit 1
fi

echo "Starting application"
exec npm start
