
# Use the node:20-alpine base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if exists) separately to optimize caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire frontend directory contents into the container at /app
COPY . .

# Build your frontend application
RUN npm run build

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
