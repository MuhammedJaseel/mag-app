# Use Node official image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./


RUN npm install --force

# Copy
COPY . .

# Build
RUN npm run build

# Expose port (example 5010)
EXPOSE 5010

# Start app
CMD ["npm", "run", "start:prod"]