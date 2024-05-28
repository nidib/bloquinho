-- +migrate Up
ALTER TABLE "main"."bloquinho"
ADD COLUMN "edit_key" TEXT;

-- +migrate Down
ALTER TABLE "main"."bloquinho"
DROP COLUMN "edit_key";
