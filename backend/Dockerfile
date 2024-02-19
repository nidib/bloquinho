FROM golang:1.22.0 AS build

WORKDIR /app

COPY . ./

RUN CGO_ENABLED=0 GOOS=linux make build

FROM alpine:latest

WORKDIR /app

ARG COMMIT_HASH=""
ENV COMMIT_HASH=${COMMIT_HASH}
RUN echo "COMMIT_HASH: ${COMMIT_HASH}"

COPY --from=build /app/bin/server ./

RUN mkdir ./logs

EXPOSE 8080

CMD ["./server"]
