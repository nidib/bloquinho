-- +migrate Up
CREATE SCHEMA IF NOT EXISTS "main";

-- +migrate Down
DROP SCHEMA "main" CASCADE;
