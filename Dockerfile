# Create an official node image
FROM node:20

# Criate directory inside container
WORKDIR /app

# Copy package.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy the rest of the project
COPY . .

# used port to the project
EXPOSE 8080

# starts aplication 
CMD ["node", "index.js"] 