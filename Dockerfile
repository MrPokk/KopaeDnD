# Или используем Node.js 22
FROM node:22-alpine as builder

WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
RUN npm ci

COPY . .
RUN npm run build

# Финальный образ
FROM node:22-alpine

WORKDIR /app
RUN npm install -g serve

COPY --from=builder /app/dist /app/dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]