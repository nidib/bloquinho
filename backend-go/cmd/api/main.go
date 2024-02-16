package main

import (
	"log"

	"github.com/nidib/bloquinho/backend/internal/app"
)

func main() {
	log.Fatal(app.MakeAppAndRun())
}
