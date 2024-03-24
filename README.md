# Bloquinho

Um bloco de notas online.

## Backend

### Tecnologias

-   Go v1.22.0
-   PostgreSQL v14.7

## Frontend

### Tecnologias

-   React v18.2.0
-   TypeScript v5.0.2

# Como rodar a aplicação localmente

## Variáveis de ambiente
O projeto depende, atualmente, das seguintes variáveis de ambiente que precisam estar definidas de alguma forma. Seja através do arquivo .env ou diretamente no sistema operacional.

- POSTGRES_URL=postgres://{nome_do_user_postgres}:{senha_do_user_postgres}@127.0.0.1:5432/bloquinho?sslmode=disable&application_name=go-api
- TEST_POSTGRES_URL=postgres://{nome_do_user_postgres}:{senha_do_user_postgres}@127.0.0.1:5432/bloquinho_tests?sslmode=disable&application_name=go-api-tests
- LOGS_FILE_PATH={caminho_absoluto_até_a_raiz_do_projeto}/backend/.log/bloquinho.log

PS: O projeto possui um exemplo de arquivo .env, se optar por definir as variáveis de ambiente dessa forma, pode basear-se nele. Rodando `cp .env.example .env` no terminal, você pode copiá-lo em um arquivo .env, onde poderá preencher os placeholders das variáveis de exemplo.

## Banco de dados
-   Subir um servidor PostgresQL (como fazer: https://www.postgresqltutorial.com/postgresql-getting-started/)
-   Criar um banco com o nome `bloquinho`
-   Manter exposto na porta padrão (5432)
-   Para testes, criar também um banco com o nome `bloquinho_tests`

## Back-end
Tendo as varáveis de ambiente definidas, e o banco rodando, podemos rodar o back-end:

- Via makefile: `make dev`
- Via CLI do go: `go run ./cmd/api/main.go`

## Front-end
Tendo node.js instalado, rode `npm i` para instalar as dependências e `npm run dev` para rodar a aplicação.