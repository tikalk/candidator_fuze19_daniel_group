FROM node:slim

WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
COPY . ./
EXPOSE 5000
RUN npm run build && \
    yarn global add serve

CMD [ "serve", "-s", "build" ]
