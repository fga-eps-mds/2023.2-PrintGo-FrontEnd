# Development stage
FROM node:18.18-bookworm-slim AS development
ENV NODE_ENV development

# Directory
WORKDIR /app

# Installing dumb-init and other necessary packages
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

# Install all dependencies
# As a user with less privileges, sometimes npm ci can fail due to permission issues
COPY package*.json /app/
RUN npm install

# Copy files
COPY . /app/

# Expose the port
EXPOSE 3000

CMD ["dumb-init", "npm", "start"]
