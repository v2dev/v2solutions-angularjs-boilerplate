# Use official node image as the base image
FROM node:18-alpine3.19 as angular

# Set the working directory
WORKDIR /app

# Add the source code to app
COPY . .

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build

FROM http:alpine3

WORKDIR /usr/local/apache2/htdocs
COPY --from=angular /app/dist/v2solutions-angular-boilerplate .
