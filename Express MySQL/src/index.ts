require('dotenv').config()
import express from 'express';
import { serve, setup } from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';
import { json } from 'body-parser';
import {Connection, createConnection } from 'mysql';
import {categories} from './routes/categories';
import {items} from './routes/items';

const connection = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect();

const port = process.env.PORT || 8080;

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options)

const app = express()
.use(cors())
.use(json())
.use(categories(connection))
.use('/swagger', serve, setup(swaggerSpec))
.use(items(connection));

app.listen(port, () => {
  console.log(`Server stared: http://localhost:${port}`);
});
