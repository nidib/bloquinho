package appErrors

import "net/http"

type AppError struct {
	Message string
	Code    int
}

func (err AppError) Error() string {
	return err.Message
}

func makeAppError(message string, code int) AppError {
	return AppError{
		Message: message,
		Code:    code,
	}
}

var BloquinhoDoesNotExistError AppError = makeAppError("Bloquinho não encontrado", http.StatusNotFound)
