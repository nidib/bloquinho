package handlers

import (
	"database/sql"
	"errors"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/nidib/bloquinho/backend/datasources/postgres"
	"github.com/nidib/bloquinho/backend/datasources/postgres/models"
	"github.com/nidib/bloquinho/backend/internal/appErrors"
	"github.com/nidib/bloquinho/backend/internal/usecases"
)

var bloquinhoUsecase usecases.BloquinhoUsecase = usecases.BloquinhoUsecase{
	BloquinhoRepository: &models.BloquinhoRepository{
		DB: postgres.GetConnection(),
	},
}

func GetBloquinhoByTitleHandler(c *fiber.Ctx) error {
	b, err := bloquinhoUsecase.GetBloquinhoByTitle(c.Params("title"))
	if err != nil {
		switch {
		case errors.Is(err, sql.ErrNoRows):
			return appErrors.BloquinhoDoesNotExistError
		default:
			return err
		}
	}

	return c.JSON(presentBloquinho(*b))
}

type PresentableBloquinho struct {
	Id           string `json:"id"`
	Title        string `json:"title"`
	Content      string `json:"content"`
	Extension    string `json:"extension"`
	LineWrap     bool   `json:"lineWrap"`
	LastViewedAt string `json:"lastViewedAt"`
	UpdatedAt    string `json:"updatedAt"`
}

func presentBloquinho(b models.Bloquinho) *PresentableBloquinho {
	return &PresentableBloquinho{
		Id:           b.Id,
		Title:        b.Title,
		Content:      b.Content,
		Extension:    b.Extension,
		LastViewedAt: b.LastViewedAt.Format(time.RFC3339),
		UpdatedAt:    b.UpdatedAt.Format(time.RFC3339),
	}
}
