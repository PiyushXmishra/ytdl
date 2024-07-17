# Use the node:20-alpine base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if exists) separately to optimize caching
COPY frontend/package*.json ./

# Install dependencies (assuming NODE_ENV=development)
RUN NODE_ENV=development npm i

# Copy the entire frontend directory contents into the container at /app
COPY frontend .


# Set environment variable to be available during build
ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

# Create .env.local file
RUN echo "NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL" > .env.local


# Build your frontend application (assuming npm run build is defined in your package.json)
RUN npm run build

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]