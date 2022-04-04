FROM node:16

WORKDIR .

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "src/index.js"]

EXPOSE 3000
