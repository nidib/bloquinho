package middlewares

import (
	"time"

	appLogger "github.com/nidib/bloquinho/backend/internal/logger"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func Recover() func(*fiber.Ctx) error {
	return recover.New()
}

func Logger() func(*fiber.Ctx) error {
	format := "time=${time} method=${method} path=${path} queryParams=${queryParams} status=${status} latency=${latency} bytesReceived=${bytesReceived} ip=${ip} bytesSent=${bytesSent} error=${error} \n"

	return logger.New(logger.Config{
		TimeFormat:    time.RFC3339,
		DisableColors: true,
		Format:        format,
		Output:        *appLogger.GetLoggerHandler(),
	})
}

func Cors() func(*fiber.Ctx) error {
	return cors.New(cors.Config{
		AllowOrigins: "*",
	})
}
