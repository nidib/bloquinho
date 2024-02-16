.PHONY: compile dev test

compile:
	go vet ./...

dev:
	go run ./cmd/api/main.go

test:
	go test -count=1 -cover ./...
