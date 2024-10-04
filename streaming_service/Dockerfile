FROM node:current-alpine3.20

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 5173

CMD ["sh", "-c", "yarn dev"]