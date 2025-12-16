# Build stage
FROM node:18-alpine AS build
WORKDIR /app

COPY package.json .
RUN npm install --silent
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
# Ensure config.js exists with a default
RUN echo "window.__BACKEND_URL__ = 'http://backend:8000';" > /usr/share/nginx/html/config.js
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
