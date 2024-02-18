package usecases

import (
	"database/sql"
	"errors"

	"github.com/nidib/bloquinho/backend/datasources/postgres/models"
	"github.com/nidib/bloquinho/backend/internal/appErrors"
)

type BloquinhoUsecase struct {
	Repository *models.BloquinhoRepository
}

func (s *BloquinhoUsecase) GetBloquinhoByTitle(title string) (*models.Bloquinho, error) {
	bloquinho, err := s.Repository.GetBloquinhoByTitle(title)

	if err != nil && errors.Is(err, sql.ErrNoRows) {
		return &models.Bloquinho{}, appErrors.BloquinhoDoesNotExistError
	}

	return bloquinho, err
}

func (s *BloquinhoUsecase) CreateOrUpdateBloquinhoByTitle(bloquinho *models.Bloquinho) (bool, error) {
	return s.Repository.UpsertByTitle(bloquinho)
}
