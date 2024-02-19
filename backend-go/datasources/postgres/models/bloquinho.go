package models

import (
	"fmt"
	"time"

	"github.com/jmoiron/sqlx"
)

type Bloquinho struct {
	Id           string    `db:"id"`
	Title        string    `db:"title"`
	Content      string    `db:"content"`
	Extension    string    `db:"extension"`
	IsPublic     bool      `db:"is_public"`
	LastViewedAt time.Time `db:"last_viewed_at"`
	CreatedAt    time.Time `db:"created_at"`
	UpdatedAt    time.Time `db:"updated_at"`
}

type BloquinhoRepository struct {
	Datasource *sqlx.DB
}

func (s *BloquinhoRepository) GetBloquinhoByTitle(title string) (*Bloquinho, error) {
	bloquinho := Bloquinho{}

	err := s.Datasource.Get(&bloquinho, `SELECT * FROM "main"."bloquinho" as b WHERE b.title = $1`, title)
	if err != nil {
		return &Bloquinho{}, fmt.Errorf("SQL ERROR: %w", err)
	}

	return &bloquinho, nil
}

func (s *BloquinhoRepository) UpsertByTitle(bloquinho *Bloquinho) (bool, error) {
	query := `
		INSERT INTO "main"."bloquinho" as b
			("title", "content", "extension")
		VALUES
			($1, $2, $3)
		ON CONFLICT ("title")
		DO UPDATE SET
			"content" = $2,
			"extension" =  $3,
			"last_viewed_at" = now(),
			"updated_at" = now()
		WHERE b."title" = $1
		RETURNING *;
	`
	err := s.Datasource.Get(bloquinho, query, bloquinho.Title, bloquinho.Content, bloquinho.Extension)
	if err != nil {
		return false, fmt.Errorf("SQL ERROR: %w", err)
	}

	return bloquinho.CreatedAt.Equal(bloquinho.UpdatedAt), nil
}
