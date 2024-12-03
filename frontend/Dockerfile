FROM node:20.9 as builder

WORKDIR /app

COPY package.json package-lock.json .

RUN npm i --frozen-lockfile

COPY . .

RUN npm run build

FROM node:20.9 as production

WORKDIR /app

COPY --from=builder /app/dist /app/dist

RUN npm i -g http-server

EXPOSE 3000

CMD ["http-server", "./dist", "-p 3000"]
