package handlers

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
)

func PingHandler(c *fiber.Ctx) error {
	return c.Status(http.StatusOK).JSON(fiber.Map{
		"henlo": "wold",
	})
}
