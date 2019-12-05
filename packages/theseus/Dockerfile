FROM node:slim

WORKDIR /app
COPY package.json ./
RUN yarn

COPY . ./
RUN npm run build && \
    yarn global add serve

EXPOSE 5000
CMD [ "serve", "-s", "build" ]
