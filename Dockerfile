FROM --platform=linux/amd64 node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder

RUN apk update
RUN apk add --no-cache libc6-compat git
WORKDIR /app

COPY . .

RUN pnpm install
RUN pnpm build

FROM base AS runner
WORKDIR /app
 
RUN adduser --system --uid 1001 reactjs
USER reactjs

COPY --from=builder --chown=reactjs:reactjs /app/build ./build
COPY --from=builder --chown=reactjs:reactjs /app/public ./build
