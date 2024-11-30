# # Step 1: Use official Node.js image as base image
# FROM node:18-alpine AS builder

# # Step 2: Set the working directory inside the container
# WORKDIR /app

# # Step 3: Copy package.json and package-lock.json to the working directory
# COPY package.json package-lock.json ./

# # Step 4: Install the dependencies
# RUN npm install

# # Step 5: Copy the rest of your application code
# COPY . .

# # Step 6: Build the React app for production
# RUN npm run build

# # Step 7: Install a web server (e.g., nginx) to serve the React app
# FROM node:18-alpine

# WORKDIR /app
# # ENV NODE_ENV=production
# COPY --from=builder /app /app
# EXPOSE 3000
# CMD ["npm", "run", "start"]


#########################################################

# Step 1: Use official Node.js image as base image
FROM node:18-alpine AS builder

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of your application code
COPY . .

# Step 6: Build the React app
RUN npm run build

# Step 7: Serve the app using a lightweight Node.js server
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]

# Step 8: Expose port 3000
EXPOSE 3000
