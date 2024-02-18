package logger

import (
	"fmt"
	"io"
	"log/slog"
	"os"
	"sync"
)

var (
	once sync.Once
	l    *slog.Logger
)

func Info(msg string, args ...any) {
	getLogger().Info(msg, args...)
}

func Warn(msg string, args ...any) {
	getLogger().Warn(msg, args...)
}

func Error(msg string, args ...any) {
	getLogger().Error(msg, args...)
}

func getLogger() *slog.Logger {
	once.Do(func() {
		l = slog.New(slog.NewTextHandler(*GetLoggerHandler(), nil))
	})

	return l
}

func GetLoggerHandler() *io.Writer {
	var handler io.Writer

	if os.Getenv("MODE") == "TEST" {
		handler = io.MultiWriter(os.Stdout)
	} else {
		handler = io.MultiWriter(getFile(), os.Stdout)
	}

	return &handler
}

func getFile() *os.File {
	flags := os.O_CREATE | os.O_WRONLY | os.O_APPEND

	logsFilePath, ok := os.LookupEnv("LOGS_FILE_PATH")
	if !ok {
		panic(fmt.Sprintf("Missing %s env", "LOGS_FILE_PATH"))
	}

	file, err := os.OpenFile(logsFilePath, flags, 0644)
	if err != nil {
		panic(err)
	}

	return file
}
