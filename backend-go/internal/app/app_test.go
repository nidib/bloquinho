package app_test

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/nidib/bloquinho/backend/internal/app"
)

func TestShouldRespondWithOkOnPingRoute(t *testing.T) {
	app := app.MakeApp()
	defer app.Shutdown()

	res, _ := app.Test(httptest.NewRequest("GET", "/", nil))

	if res.StatusCode != http.StatusOK {
		t.Errorf("Status recebido %d", res.StatusCode)
	}
}
