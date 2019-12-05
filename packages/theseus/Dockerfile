FROM node:slim AS builder

WORKDIR /app
COPY package.json ./
RUN yarn

RUN npm install react-scripts@3.0.1 -g --silent
COPY . ./
RUN npm run build

FROM node:slim
COPY --from=builder /app/build /build
EXPOSE 5000
RUN yarn global add serve

CMD [ "serve", "-s", "build" ]
