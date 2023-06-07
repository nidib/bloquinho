FROM node:18.16.0

WORKDIR /usr/src/app
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json ./
RUN pnpm install
COPY ./src ./src
EXPOSE 8080
CMD pnpm start
