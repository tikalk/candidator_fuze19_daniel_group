FROM node:slim

WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
COPY . ./
EXPOSE 3001

CMD [ "npm", "start" ]
