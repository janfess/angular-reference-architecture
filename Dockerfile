FROM node:24-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build:prod

RUN find ./dist -name "*.map" -type f -delete

FROM node:24-alpine
WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist/personal-website ./dist/personal-website
COPY server.static.mjs ./

USER node

ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.static.mjs"]
