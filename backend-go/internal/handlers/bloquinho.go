package handlers

import (
	"fmt"
	"net/http"
	"slices"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/nidib/bloquinho/backend/datasources/postgres"
	"github.com/nidib/bloquinho/backend/datasources/postgres/models"
	"github.com/nidib/bloquinho/backend/internal/appErrors"
	"github.com/nidib/bloquinho/backend/internal/usecases"
)

var bloquinhoPostgresRepository = models.BloquinhoRepository{
	Datasource: postgres.GetConnection(),
}
var bloquinhoUsecase usecases.BloquinhoUsecase = usecases.BloquinhoUsecase{
	Repository: &bloquinhoPostgresRepository,
}

func GetBloquinhoByTitleHandler(c *fiber.Ctx) error {
	b, err := bloquinhoUsecase.GetBloquinhoByTitle(c.Params("title"))
	if err != nil {
		return err
	}

	return c.JSON(presentBloquinho(*b))
}

type CreateOrUpdateReq struct {
	Title     string `json:"title"`
	Content   string `json:"content"`
	Extension string `json:"extension"`
}

var extensions = []string{"java", "js", "jsx", "ts", "tsx", "txt", "sql", "html", "py", "md", "css"}

func (s *CreateOrUpdateReq) validate() error {
	const title_max_len int = 50

	if len(s.Title) > title_max_len {
		message := fmt.Sprintf("O título de um bloquinho pode ter no máximo %d caracteres", title_max_len)
		return appErrors.ValidationError("title", []string{message})
	}

	if !slices.Contains(extensions, s.Extension) {
		message := fmt.Sprintf("Um bloquinho pode possuir apenas as extensões: %s", strings.Join(extensions, ", "))
		return appErrors.ValidationError("extension", []string{message})
	}

	return nil
}

func CreateOrUpdateBloquinhoByTitle(c *fiber.Ctx) error {
	bloquinhoFromReq := CreateOrUpdateReq{}
	raw := string(c.BodyRaw())
	_ = raw
	if err := c.BodyParser(&bloquinhoFromReq); err != nil {
		return err
	}
	if err := bloquinhoFromReq.validate(); err != nil {
		return err
	}

	updatedBloquinho := models.Bloquinho{
		Title:     bloquinhoFromReq.Title,
		Content:   bloquinhoFromReq.Content,
		Extension: bloquinhoFromReq.Extension,
	}
	hasCreated, err := bloquinhoUsecase.CreateOrUpdateBloquinhoByTitle(&updatedBloquinho)
	if err != nil {
		return err
	}

	statusOnCreate := map[bool]int{
		true:  http.StatusCreated,
		false: http.StatusOK,
	}
	status := statusOnCreate[hasCreated]

	return c.Status(status).JSON(presentBloquinho(updatedBloquinho))
}

type PresentableBloquinho struct {
	Id           string `json:"id"`
	Title        string `json:"title"`
	Content      string `json:"content"`
	Extension    string `json:"extension"`
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
