package appErrors

import "net/http"

type AppError struct {
	Message string
	Code    int
	Details map[string][]string
}

func (s AppError) Error() string {
	return s.Message
}

func makeAppError(message string, code int, errors map[string][]string) AppError {
	return AppError{
		Message: message,
		Code:    code,
		Details: errors,
	}
}

var BloquinhoDoesNotExistError AppError = makeAppError("Bloquinho não encontrado", http.StatusNotFound, nil)

func ValidationError(fieldName string, errors []string) AppError {
	return makeAppError("Erro de validação", http.StatusNotFound, map[string][]string{
		fieldName: errors,
	})
}
