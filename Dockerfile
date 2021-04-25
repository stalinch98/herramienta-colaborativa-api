FROM node:15.8.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 1323
CMD [ "node", "server/server.js" ]