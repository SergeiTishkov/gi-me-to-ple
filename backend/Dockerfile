FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build with esbuild
RUN npm run build

# Run the server
CMD ["npm", "start"]