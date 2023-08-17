Criar projeto

1 - npm init -y
2 - criar pasta SRC
3 - instalar typescript npm i typescript @types/node tsx tsup -D
4 - npx tsc --init
5 - tsconfig - alterar "target" para es2020
6 - npm i fastify
7 - app.ts
8 - npm i dotenv
9 - npm i zod
10 - npm i eslint -D
11 - .eslintrc.json
12 - npm i prisma -D
13 - npx (atalho p executar na pasta bin) npx prisma init
14 - npx prisma generate
15 - npm i @prisma/client

--- Docker ---

image pg:  docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e P
OSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql

ver image: docker ps -a
start image: docker start api-solid-pg# api-solid
