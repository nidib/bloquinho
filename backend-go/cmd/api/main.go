package main

import (
	"github.com/nidib/bloquinho/backend/datasources/postgres"
	"github.com/nidib/bloquinho/backend/internal/app"
	"github.com/nidib/bloquinho/backend/internal/logger"
)

func init() {
	postgres.Migrate()
}

func main() {
	actualApp := app.MakeApp()

	logger.Error(actualApp.Listen("0.0.0.0:8080").Error())
}
