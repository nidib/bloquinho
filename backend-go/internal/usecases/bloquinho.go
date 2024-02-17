package usecases

import "github.com/nidib/bloquinho/backend/datasources/postgres/models"

type BloquinhoUsecase struct {
	*models.BloquinhoRepository
}

func (s *BloquinhoUsecase) GetBloquinhoByTitleUsecase(title string) (*models.Bloquinho, error) {
	bloquinho, err := s.BloquinhoRepository.GetBloquinhoByTitle(title)

	return bloquinho, err
}
