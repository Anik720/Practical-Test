# Project Name:  Article Express API 
# Description:
    This Node.js project which is a Article Express API building Express.js applications with MongoDB integration. It includes Docker configuration for containerization.

    The features of this project is that user can sign up and login into the system and token will be generate. Using that token a protected route api/v1/articles is implemented which user can get access. For that two two middlewares are used. One is for user is loggedin or not and another one is for checking the role.

    


# Prerequisites:
* Node.js
* MongoDB
* Docker


# Installation:
Install dependencies:
* npm install
* Create a config.env file in the root directory and populate it with the following environment variables:

# config.env file

NODE_ENV=development
DATABASE=mongodb+srv://golamanik192:<PASSWORD>@cluster0.bnbngdt.mongodb.net/?retryWrites=true&w=majority
DATABASE_PASSWORD=tmprOCNoI4ZgDGUZ
JWT_SECRET=anik1234
JWT_EXPIRES_IN=100d

# Usage:
* To run the application locally:

* npm run dev
* To run the application in production mode:


# Docker Configuration:
* Dockerfile:
* Dockerfile
* Copy code
* FROM --platform=linux/amd64 node:18
* WORKDIR /app
* COPY . ./
* RUN npm install
* EXPOSE 8000
* CMD ["node", "server.js"]

# For Building the docker image
docker buildx build -t practicaltest:latest . 

# For running the project on docker
docker run -d -p 8000:8000 practicaltest:latest

