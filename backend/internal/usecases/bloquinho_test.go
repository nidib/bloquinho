package usecases_test

import (
	"os"
	"testing"

	"github.com/nidib/bloquinho/backend/datasources/postgres"
	"github.com/nidib/bloquinho/backend/datasources/postgres/models"
	"github.com/nidib/bloquinho/backend/internal/appErrors"
	"github.com/nidib/bloquinho/backend/internal/usecases"
)

func TestMain(m *testing.M) {
	postgres.Migrate()

	v := m.Run()

	postgres.Cleanup()

	os.Exit(v)
}

func makeUsecase() *usecases.BloquinhoUsecase {
	return &usecases.BloquinhoUsecase{
		Repository: &models.BloquinhoRepository{
			Datasource: postgres.GetConnection(),
		},
	}
}

func TestItShouldReturnTheBloquinhoByTitleIfItExists(t *testing.T) {
	usecase := makeUsecase()
	t.Cleanup(func() {
		postgres.Cleanup()
	})

	_, err := usecase.GetBloquinhoByTitle("arnold")

	expectedError := appErrors.BloquinhoDoesNotExistError.Error()
	if err != nil && err.Error() != expectedError {
		t.Errorf(`Expected error "%s", but got "%s"`, expectedError, err)
	}
}

func TestItShouldReturnAnErrorIfTheBloquinhoTitleDoesNotExist(t *testing.T) {

}
