FROM node:20

WORKDIR /usr/src/app/server

COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD ["sh", "-c", "npm run migration && npm run start"]
