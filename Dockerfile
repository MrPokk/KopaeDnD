FROM node:22-alpine as builder

WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
RUN npm ci

COPY . .
RUN npm run build

# Финальный образ
FROM nginx:alpine

# Копируем nginx конфигурацию
COPY nginx.conf /etc/nginx/nginx.conf

# Копируем собранное приложение
COPY --from=builder /app/dist /usr/share/nginx/html

# Создаем папку для SSL сертификатов (будут монтироваться)
RUN mkdir -p /etc/nginx/ssl

# Проверяем и копируем extension.json если существует
RUN if [ -f /app/dist/extension.json ]; then \
    cp /app/dist/extension.json /usr/share/nginx/html/extension.json; \
    else \
    echo "extension.json not found in dist, creating default..."; \
    echo '{"name":"KopaeDnD","version":"2.0.0","manifestVersion":1}' > /usr/share/nginx/html/extension.json; \
    fi

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]