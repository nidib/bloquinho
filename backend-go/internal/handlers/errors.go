package handlers

import (
	"fmt"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/nidib/bloquinho/backend/internal/appErrors"
	"github.com/nidib/bloquinho/backend/internal/logger"
)

var (
	defaultMessage = "Algo deu errado"
	defaultStatus  = http.StatusInternalServerError
)

func ErrorHandler(c *fiber.Ctx, err error) error {
	var message string
	var status int
	var errors map[string][]string

	logger.Error(err.Error())

	switch err := err.(type) {
	case appErrors.AppError:
		message = err.Error()
		status = err.Code
		errors = err.Details
	default:
		message = defaultMessage
		status = defaultStatus
		errors = nil
	}

	return c.Status(status).JSON(fiber.Map{
		"message": message,
		"errors":  errors,
	})
}

func NotFoundHandler(c *fiber.Ctx) error {
	message := fmt.Sprintf("Rota %s não econtrada", c.Path())

	return c.Status(http.StatusNotFound).JSON(fiber.Map{
		"message": message,
	})
}
