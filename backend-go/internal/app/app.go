package app

import "github.com/gofiber/fiber/v2"

func MakeAppAndRun() error {
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"henlo": "wold",
		})
	})

	return app.Listen("127.0.0.1:8080")
}
