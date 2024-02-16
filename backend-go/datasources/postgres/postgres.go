package postgres

import (
	"embed"
	"fmt"
	"sync"

	_ "github.com/jackc/pgx/v5/stdlib"
	"github.com/jmoiron/sqlx"
	"github.com/nidib/bloquinho/backend/internal/logger"
	migrate "github.com/rubenv/sql-migrate"
)

var (
	db     *sqlx.DB
	dbOnce sync.Once
)

//go:embed migrations/*
var migrationsDir embed.FS

func Migrate() {
	migrations := migrate.EmbedFileSystemMigrationSource{
		FileSystem: migrationsDir,
		Root:       "migrations",
	}

	conn := GetConnection()

	migrate.SetSchema("main")
	migrate.SetTable("migration_schema")

	n, err := migrate.Exec(conn.DB, "postgres", migrations, migrate.Up)

	if err != nil {
		panic(err)
	}

	logger.Info(fmt.Sprintf("✓ Applied %d migrations!\n", n))
}

func GetConnection() *sqlx.DB {
	var err error

	dbOnce.Do(func() {
		db, err = sqlx.Connect("pgx", "postgres://docker:docker@127.0.0.1:5432/bloquinho?sslmode=disable&application_name=go-api")
		if err != nil {
			panic(err)
		}

		logger.Info("✓ Connected to PostgreSQL")
	})

	return db
}
