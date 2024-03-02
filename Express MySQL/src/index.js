require('dotenv').config()
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const categories = require('./routes/categories');
const items = require('./routes/items');

const connection = mysql.createConnection({
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
.use(bodyParser.json())
.use(categories(connection))
.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
.use(items(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
