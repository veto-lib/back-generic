FROM node:14-alpine AS builder

WORKDIR /app
COPY . .

RUN npm ci && npm run build
RUN cp -r node_modules build/ && cp .env.heroku build/.env

FROM node:14-alpine

COPY --from=builder /app/build /app

WORKDIR /app

CMD echo "API_PORT=$PORT" >> .env && node index.js
