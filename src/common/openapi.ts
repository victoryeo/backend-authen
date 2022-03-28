import { OpenApiValidator } from 'express-openapi-validate';
import * as fs from 'fs';
import * as path from 'path';
import yaml from 'js-yaml';

const openApiDocument = yaml.safeLoad(
  fs.readFileSync(
    path.join(__dirname, '../../openapi', 'openapi.yaml'),
    'utf-8'
  )
);

const validator = new OpenApiValidator(openApiDocument);

export default validator;
