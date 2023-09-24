FROM node:16-alpine as builder

WORKDIR /app

RUN npm i -g @vercel/ncc

COPY package*.json ./

RUN npm ci

COPY . .

RUN ncc build src/index.js -m -t -o dist

# Start from smaller image
FROM alpine:3.16 as runner

RUN apk add --update nodejs

WORKDIR /app

COPY --from=builder app/dist .

CMD ["node", "index.js"]

EXPOSE 3000
