Bond Tokens platform backend

## API

- /api/v1/\*

## OpenAPI specification

- [openapi.yaml](./openapi/openapi.yaml)

## NPM scripts

- `npm install` - Install dependencies
- `npm run lint` - Lint code
- `npm run start` - Start application
- `npm run start:dev` - Start application in watch mode
- `npm run test` - run Jest test runner

## Environment configuration

Clone `.env-sample` to `.env` and update value for following environment variables

| Variable Name        | Default value  | Description               |
| -------------------- | -------------- | ------------------------- |
| `PORT`               | 3000           | Application port name     |

## curl example
curl -X GET http://127.0.0.1:4001/api/v1/assets/hello
curl -X POST http://localhost:4001/api/v1/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"

