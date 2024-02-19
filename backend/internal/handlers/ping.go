package handlers

import (
	"net/http"
	"os"

	"github.com/gofiber/fiber/v2"
)

func PingHandler(c *fiber.Ctx) error {
	commitHash := os.Getenv("COMMIT_HASH")

	if len(commitHash) > 7 {
		commitHash = commitHash[:8]
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{
		"version": commitHash,
	})
}
