FROM node:20

WORKDIR /usr/src/app/server

COPY package*.json ./

RUN npm install
RUN npm i -g rimraf @nestjs/cli sqlite3 --force

EXPOSE 3000

CMD ["sh", "-c", "npm run migration && npm run start"]
