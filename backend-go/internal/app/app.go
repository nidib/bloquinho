package app

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nidib/bloquinho/backend/internal/handlers"
)

func MakeApp() *fiber.App {
	app := fiber.New(fiber.Config{
		ErrorHandler: handlers.ErrorHandler,
	})

	// Health
	app.Get("/", handlers.PingHandler)

	// Bloquinho
	app.Get("/bloquinho/:title", handlers.GetBloquinhoByTitleHandler)

	return app
}
