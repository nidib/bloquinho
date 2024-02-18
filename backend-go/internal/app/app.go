package app

import (
	"github.com/gofiber/fiber/v2"

	"github.com/nidib/bloquinho/backend/internal/handlers"
	"github.com/nidib/bloquinho/backend/internal/middlewares"
)

func MakeApp() *fiber.App {
	app := fiber.New(fiber.Config{
		ErrorHandler: handlers.ErrorHandler,
	})

	// Middlewares
	app.Use(middlewares.Recover())
	app.Use(middlewares.Logger())

	// Health
	app.Get("/", handlers.PingHandler)

	// Bloquinho
	app.Get("/bloquinho/:title", handlers.GetBloquinhoByTitleHandler)

	// Not Found
	app.Use(handlers.NotFoundHandler)

	return app
}
