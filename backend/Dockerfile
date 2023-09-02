FROM node:18.16.0

ARG COMMIT_HASH=""
ENV COMMIT_HASH=${COMMIT_HASH}

RUN echo "COMMIT_HASH: ${COMMIT_HASH}"

WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci
COPY ./src ./src
EXPOSE 8080
CMD npm start
