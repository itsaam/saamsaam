FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies (use npm install to support cases without package-lock.json)
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund --silent

# Copy source and build
COPY . .
RUN npm run build

# Production image using nginx to serve the built static files
FROM nginx:stable-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Use a custom nginx configuration to support SPA routing (history fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
