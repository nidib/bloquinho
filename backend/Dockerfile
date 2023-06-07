FROM node:18.16.0

WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci
COPY ./src ./src
EXPOSE 8080
CMD npm start
