# Use the official Node.js image with Alpine

FROM node:20-alpine
# Set the working directory
# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Ensure a clean environment
# RUN rm -rf node_modules package-lock.json && npm cache clean --force


# Install dependencies (including dev dependencies)
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build TypeScript Code (Ensure tsconfig.json exists)
RUN npx tsc

# Set environment variables
ENV PORT=5000
ENV TEST_PORT=5000
ENV FRONTEND_URL=https://nelloehr.onrender.com


# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]