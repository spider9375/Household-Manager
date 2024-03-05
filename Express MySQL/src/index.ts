require('dotenv').config();
import express from 'express';
import { serve, setup } from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';
import { json } from 'body-parser';
import { Connection, createConnection } from 'mysql';
import { categories } from './routes/categories';
import { items } from './routes/items';

const connection = createConnection({
    host: process.env.DB_ENVIRONMENT == 'local' ? process.env.DB_HOST : process.env.RDS_HOSTNAME,
    user: process.env.DB_ENVIRONMENT == 'local' ? process.env.DB_USER : process.env.RDS_USERNAME,
    password: process.env.DB_ENVIRONMENT == 'local' ? process.env.DB_PASSWORD : process.env.RDS_PASSWORD,
    database: process.env.DB_ENVIRONMENT == 'local' ? process.env.DB_NAME : process.env.RDS_DB_NAME,
    port: parseInt(process.env.RDS_PORT || '') || 3306,
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

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

const swaggerSpec = swaggerJsdoc(options);

const app = express()
    .use(cors())
    .use(json())
    .use(categories(connection))
    .use('/swagger', serve, setup(swaggerSpec))
    .use(items(connection));

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server stared: http://localhost:${port}`);
});
