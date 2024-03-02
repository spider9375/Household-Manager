const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const categories = require('./categories/categories');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'test-inventory',
  password: '112233',
  database: 'homeInventory'
});

connection.connect();

const port = process.env.PORT || 8080;

const app = express()
.use(cors())
.use(bodyParser.json())
.use(categories(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
