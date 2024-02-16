package logger

import (
	"log/slog"
	"os"
)

var logger = slog.New(slog.NewTextHandler(os.Stdout, nil))

func Info(msg string, args ...any) {
	logger.Info(msg, args...)
}

func Warn(msg string, args ...any) {
	logger.Warn(msg, args...)
}

func Error(msg string, args ...any) {
	logger.Error(msg, args...)
}
