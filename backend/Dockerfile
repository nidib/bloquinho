FROM oven/bun:1.0.3

ARG COMMIT_HASH=""
ENV COMMIT_HASH=${COMMIT_HASH}

RUN echo "COMMIT_HASH: ${COMMIT_HASH}"

WORKDIR /usr/src/app
COPY bun.lockb ./
COPY package.json ./
COPY tsconfig.json ./
RUN bun install
COPY ./src ./src
EXPOSE 8080
CMD bun run start
