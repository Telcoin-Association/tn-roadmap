# Use Node.js 20 as specified in package.json engines
FROM node:20 AS base

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --only=production --ignore-scripts

# Development stage
FROM base AS development
RUN npm ci --ignore-scripts
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Build stage
FROM base AS build
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS production
WORKDIR /app

# Install serve to host the built files
RUN npm install -g serve

# Copy built files from build stage
COPY --from=build /app/dist /app/dist

# Expose port
EXPOSE 3000

# Serve the built application
CMD ["serve", "-s", "dist", "-l", "3000"]
