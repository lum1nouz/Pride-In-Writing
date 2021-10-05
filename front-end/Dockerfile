FROM node:13.12.0-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install
EXPOSE 3000

COPY . ./

CMD ["npm", "start"]
