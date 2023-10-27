FROM node:16-alpine AS development
ENV NODE_ENV development

# Directory
WORKDIR /app
# Install dependencies
COPY package.json .
COPY yarn.lock .
RUN npm install 
# Copy files
COPY . .
RUN npm run build
# Expose de port
EXPOSE 3000
# Start de program
CMD [ "npm", "start" ]
