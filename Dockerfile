# Production stage only - dist comes from GitHub Actions
FROM nginx:alpine

# Copy pre-built static files
COPY dist /usr/share/nginx/html

COPY dist/env.txt /usr/share/nginx/html/env.txt

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
