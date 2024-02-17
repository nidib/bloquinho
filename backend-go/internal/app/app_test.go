package app_test

import (
	"io"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/nidib/bloquinho/backend/datasources/postgres"
	"github.com/nidib/bloquinho/backend/internal/app"
)

func TestMain(m *testing.M) {
	postgres.Migrate()

	v := m.Run()

	postgres.Cleanup()

	os.Exit(v)
}

func TestShouldRespondWithOkOnPingRoute(t *testing.T) {
	app := app.MakeApp()
	defer app.Shutdown()
	t.Cleanup(func() {
		postgres.Cleanup()
	})

	res, _ := app.Test(httptest.NewRequest("GET", "/", nil))

	if res.StatusCode != http.StatusOK {
		t.Errorf("Status recebido %d", res.StatusCode)
	}
}

func TestShouldRespondWithCommitHashVersion(t *testing.T) {
	os.Setenv("COMMIT_HASH", "qwerty1234567")
	app := app.MakeApp()
	defer app.Shutdown()
	t.Cleanup(func() {
		postgres.Cleanup()
	})

	req := httptest.NewRequest("GET", "/", nil)
	defer req.Body.Close()
	res, _ := app.Test(req)

	data, err := io.ReadAll(res.Body)
	if err != nil {
		t.Error(err)
	}
	expectedBody := `{"version":"qwerty12"}`
	if string(data) != expectedBody {
		t.Errorf("Expected body %s, but got %s", expectedBody, data)
	}
}

func TestShouldRespondWithNotFoundWhenFetchingNonexistentBloquinho(t *testing.T) {
	app := app.MakeApp()
	defer app.Shutdown()
	t.Cleanup(func() {
		postgres.Cleanup()
	})

	req := httptest.NewRequest("GET", "/bloquinho/arnold", nil)
	defer req.Body.Close()
	res, _ := app.Test(req)

	if res.StatusCode != http.StatusNotFound {
		t.Errorf("Expected status %d, but got %d", http.StatusNotFound, res.StatusCode)
	}

	data, err := io.ReadAll(res.Body)
	if err != nil {
		t.Error(err)
	}
	expectedBody := `{"message":"Bloquinho não encontrado"}`
	if string(data) != expectedBody {
		t.Errorf("Expected body %s, but got %s", expectedBody, data)
	}
}
