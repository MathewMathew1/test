# Use the official Node.js image as the base
FROM node:current

# Set the desired memory limit (e.g., 2GB)
ENV NODE_OPTIONS="--max-old-space-size=4048"

# Copy your application files to the container
COPY . /app

# Set the working directory
WORKDIR /app

# Install dependencies
RUN npm ci

# Start your application
CMD ["npm", "start"]