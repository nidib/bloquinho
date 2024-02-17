package models

import (
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
	*sqlx.DB
}

func (conn *BloquinhoRepository) GetBloquinhoByTitle(title string) (*Bloquinho, error) {
	bloquinho := Bloquinho{}

	err := conn.Get(&bloquinho, "SELECT * FROM main.bloquinho as b WHERE b.title = $1", title)
	if err != nil {
		return &Bloquinho{}, err
	}

	return &bloquinho, nil
}
