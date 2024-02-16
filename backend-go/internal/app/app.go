package app

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nidib/bloquinho/backend/internal/handlers"
)

func MakeApp() *fiber.App {
	app := fiber.New()

	// Health
	app.Get("/", handlers.PingHandler)

	return app
}
