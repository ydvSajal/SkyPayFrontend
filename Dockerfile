# ---- Stage 1: Build ----
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies (clean install)
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the Next.js app
RUN npm run build

# ---- Stage 2: Production Runner ----
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Only copy what's needed to run
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Cloud Run sets PORT env var, Next.js listens on it
ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.js"]
