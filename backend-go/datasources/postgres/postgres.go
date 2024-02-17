package postgres

import (
	"embed"
	"fmt"
	"os"
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

func Cleanup() {
	conn := GetConnection()

	_, err := conn.Exec(`
		TRUNCATE TABLE "main"."bloquinho" CASCADE;
	`)
	if err != nil {
		panic(err)
	}
}

func GetConnection() *sqlx.DB {
	var err error

	mode := os.Getenv("MODE")
	urlEnvName := "POSTGRES_URL"
	if mode == "TEST" {
		urlEnvName = "TEST_POSTGRES_URL"
	}
	url, ok := os.LookupEnv(urlEnvName)
	if !ok {
		panic(fmt.Sprintf("Missing %s env", urlEnvName))
	}

	dbOnce.Do(func() {
		db, err = sqlx.Connect("pgx", url)
		if err != nil {
			panic(err)
		}

		logger.Info("✓ Connected to PostgreSQL")
	})

	return db
}
