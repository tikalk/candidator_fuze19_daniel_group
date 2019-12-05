FROM node:slim

WORKDIR /usr/src
COPY . ./
RUN yarn

RUN npm run build && \
    yarn global add serve

EXPOSE 5000
CMD [ "serve", "-s", "build" ]
