.PHONY: compile dev test

ifneq (,$(wildcard ./.env))
    include .env
    export
endif

compile:
	go vet ./...

dev:
	go run ./cmd/api/main.go

test:
	MODE=TEST go test -v -count=1 -cover ./...
