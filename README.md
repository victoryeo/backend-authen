Backend platform with passport authentication

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
| `PORT`               | 4001           | Application port name     |

and update the postgres username and password.  

## curl example
curl -X GET http://127.0.0.1:4001/api/v1/assets/hello  
curl -X POST http://localhost:4001/api/v1/register -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"  
curl -X POST http://localhost:4001/api/v1/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"  
curl -X GET http://localhost:4001/api/v1/profile -H "Authorization: Bearer \<token\>"  
 

## postgresql
Create a database called backend-authen:  
CREATE DATABASE "backend-authen";  
    
After that, in postgres prompt, do: \c backend-authen  

And use this sql command to create usersetting table:  
CREATE TABLE usersetting(  
   id serial PRIMARY KEY,  
   username VARCHAR (255)  UNIQUE NOT NULL,  
   password VARCHAR (255)  NOT NULL  
);  
