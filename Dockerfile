# Development stage
FROM node:18.18-bookworm-slim AS development
ENV NODE_ENV development

# Directory
WORKDIR /app

# Installing dumb-init and other necessary packages
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

# Copy package files
COPY package*.json /app/

RUN npm cache clean --force

RUN npm install nodemon --save-dev

# Install dependencies
RUN npm ci

# Copy the rest of the files
COPY . /app/

# Expose the port
EXPOSE 3000

CMD ["dumb-init", "npm", "start"]