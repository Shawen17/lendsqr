FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app


# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./


# Install project dependencies
RUN yarn install

# Copy the entire project to the working directory
COPY . .

# Build the React app for production
RUN yarn build

# Expose the port the app runs on
EXPOSE 3000

# Start the React app
CMD ["yarn", "start"]
