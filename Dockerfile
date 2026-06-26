# Build stage
FROM node:20-slim AS builder
WORKDIR /usr/src/app

# Ensure OpenSSL is available for Prisma native engine
# Try installing libssl1.1, fall back to libssl3 if unavailable.
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates libssl1.1 bash netcat-openbsd || \
	(apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates libssl3 bash netcat-openbsd) && \
	rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

# Copy Prisma schema and generate the client so the generated runtime
# files exist in node_modules/.prisma for the runtime image.
COPY prisma ./prisma
RUN npx prisma generate

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Runtime stage
FROM node:20-slim AS runner
WORKDIR /usr/src/app

# Install OpenSSL for the Prisma query engine at runtime.
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates libssl1.1 bash netcat-openbsd || \
	(apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates libssl3 bash netcat-openbsd) && \
	rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install --production

COPY prisma ./prisma
RUN npx prisma generate

COPY --from=builder /usr/src/app/dist ./dist

# Copy entrypoint script and make executable
COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]
