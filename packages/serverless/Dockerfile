FROM node:13.2.0-slim

WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .

EXPOSE 8080
ENTRYPOINT [ "yarn", "develop" ]
