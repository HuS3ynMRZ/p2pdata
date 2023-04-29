FROM arm32v7/node

# Set the working directory to /app
WORKDIR .

# Install app dependencies
COPY package*.json ./
RUN npm install

# Install Axios and Mongoose packages
RUN npm install --save axios mongoose express


# Bundle app source
COPY . .

# Expose ports
EXPOSE 3000

# Start DB server and app
CMD ["npm", "run", "dev"]