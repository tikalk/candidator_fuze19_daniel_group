FROM node:slim AS builder

WORKDIR /app
COPY package.json ./
RUN yarn

COPY . ./
RUN npm run build:prod

EXPOSE 5000
RUN yarn global add serve

CMD [ "serve", "-s", "build" ]
