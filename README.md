# learn.io

A Deno based project that is a collaborative platform for people to share and
learn

## Architechture

This is a monorepo containing both the frontend(apps/web) and backend(apps/api)
Since both frontend and backend utilizes deno it makes sense to try a monorepo
approach There is also a dedicated db service that deals with db setup, seeding
and migrations.

## Development

After cloning make sure to setup the project `deno task setup`

You can start all of the service using `deno run start` or you can use the
individual scripts for them as well

- `deno run dev:api`
- `deno run dev:web`
- `deno run dev:db`

CORS is setup to run with FRONTEND_HOST value from env. If you dont have env
file the default is the frontend local, so it will work fine. But if you have
env file then that default value will be overridden.

## Database

The database uses 2 users

- one with DDL privileges for the db service
- one with DML privileges for the api service

This constricts extend of access for the API and adds security and isolation
