# Use Node.js 16 as the base image
FROM node:16

LABEL maintainer="pipelinedave kingovi@gmail.com"
LABEL version="0.0.1"
LABEL description="modern web frontend for Etcd, built with React and TypeScript."

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the source code to the container
COPY . .

# Build the app
RUN npm run build

# Expose port 3000 for the server
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
