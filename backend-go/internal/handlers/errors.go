package handlers

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/nidib/bloquinho/backend/internal/appErrors"
)

var (
	defaultMessage = "Algo deu errado"
	defaultStatus  = http.StatusInternalServerError
)

func ErrorHandler(ctx *fiber.Ctx, err error) error {
	var message string
	var status int

	switch err := err.(type) {
	case appErrors.AppError:
		message = err.Error()
		status = err.Code
	default:
		message = defaultMessage
		status = defaultStatus
	}

	return ctx.Status(status).JSON(fiber.Map{
		"message": message,
	})
}
