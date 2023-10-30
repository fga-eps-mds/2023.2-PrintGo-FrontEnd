# Development stage
FROM node:18.18-bookworm-slim AS development
ENV NODE_ENV development

# Directory
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

# Install all dependencies
COPY --chown=node:node package*.json /app/
RUN npm ci

# Copy files
COPY --chown=node:node . /app/

# Expose the port
EXPOSE 3000


CMD ["dumb-init", "npm", "start"]
