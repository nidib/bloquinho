package app_test

import (
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
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

func TestShouldRespondWithCreatedStatusWhenDidNotExist(t *testing.T) {
	app := app.MakeApp()
	defer app.Shutdown()
	t.Cleanup(func() {
		postgres.Cleanup()
	})
	bloquinhoTitle := "typescripto"
	body := fmt.Sprintf(`{"title": "%s", "content": "type Num = number;", "extension": "ts"}`, bloquinhoTitle)

	// req := httptest.NewRequest("GET", fmt.Sprintf("/bloquinho/%s", bloquinhoTitle), nil)
	req := httptest.NewRequest("POST", "/bloquinho", strings.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	defer req.Body.Close()
	res, _ := app.Test(req)

	if res.StatusCode != http.StatusCreated {
		t.Errorf("Expected status %d, but got %d", http.StatusCreated, res.StatusCode)
	}
}

func TestShouldRespondWithOkStatusWhenDidExist(t *testing.T) {
	app := app.MakeApp()
	defer app.Shutdown()
	t.Cleanup(func() {
		postgres.Cleanup()
	})
	bloquinhoTitle := "typescripto"
	body := fmt.Sprintf(`{"title": "%s", "content": "type Num = number;", "extension": "ts"}`, bloquinhoTitle)
	req1 := httptest.NewRequest("POST", "/bloquinho", strings.NewReader(body))
	req1.Header.Set("Content-Type", "application/json")
	defer req1.Body.Close()
	app.Test(req1)

	// req := httptest.NewRequest("GET", fmt.Sprintf("/bloquinho/%s", bloquinhoTitle), nil)
	req2 := httptest.NewRequest("POST", "/bloquinho", strings.NewReader(body))
	req2.Header.Set("Content-Type", "application/json")
	defer req2.Body.Close()
	res2, _ := app.Test(req2)

	if res2.StatusCode != http.StatusOK {
		t.Errorf("Expected status %d, but got %d", http.StatusOK, res2.StatusCode)
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
	expectedBody := `{"errors":null,"message":"Bloquinho não encontrado"}`
	if string(data) != expectedBody {
		t.Errorf("Expected body %s, but got %s", expectedBody, data)
	}
}
