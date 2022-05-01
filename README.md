# CRUD Project Alive

## Requirements

To run this project you will need

1. [NodeJS](https://nodejs.org/en/download/)
2. [Yarn](https://classic.yarnpkg.com/lang/en/docs/install)

## Environment

- `.env` file is read when in production.
- `.env.development` file is read when calling `yarn dev`.

if you need help you can use `.env.sample` to see how configure

Defaults:

 - PORT = `4000`

## Scripts
- `yarn dev` to run app in development environment.
- `yarn test` to run tests.
- `yarn build` to build TypeScript to JavaScript.
- `yarn prod` to run app in production mode.

## Main packages

- [TypeScript](https://github.com/microsoft/TypeScript)
- HTTP Server: [routing-controllers](https://github.com/typestack/routing-controllers) and [express](https://github.com/expressjs/express)
- Tests: [jest](https://github.com/facebook/jest)
- Logs: [winston](https://github.com/winstonjs/winston)


## Next steps

- add Documentation with [swagger](https://swagger.io/)
- add authentication with [JWT](https://jwt.io/)