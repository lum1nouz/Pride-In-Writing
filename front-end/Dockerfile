FROM node:13.12.0-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN pkg-config --modversion pango
RUN pkg-config --modversion cairo

RUN yarn install
#RUN npm install
EXPOSE 3000

COPY . ./

CMD ["npm", "start"]
