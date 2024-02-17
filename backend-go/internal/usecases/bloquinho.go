package usecases

import (
	"database/sql"
	"errors"

	"github.com/nidib/bloquinho/backend/datasources/postgres/models"
	"github.com/nidib/bloquinho/backend/internal/appErrors"
)

type BloquinhoUsecase struct {
	*models.BloquinhoRepository
}

func (s *BloquinhoUsecase) GetBloquinhoByTitleUsecase(title string) (*models.Bloquinho, error) {
	bloquinho, err := s.BloquinhoRepository.GetBloquinhoByTitle(title)

	if err != nil && errors.Is(err, sql.ErrNoRows) {
		return &models.Bloquinho{}, appErrors.BloquinhoDoesNotExistError
	}

	return bloquinho, err
}
