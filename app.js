require('dotenv').config();
require('./db');

const express = require('express');
const BodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');
const responseTime = require('response-time');
const helmet = require('helmet');

morgan.token('id', function getId(req) {
    return req.id;
});

const app = express();

const router = express.Router();

const routes = require('./route/todo.route')(app, router);

app.use(morgan(':id - :remote-addr - :date[format] :method :url :status :response-time ms :total-time ms'));
app.use(responseTime());
app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.use('/', routes);


const port = process.env.PORT || 8000;

app.listen(port, () => { console.log(`Running on http://localhost:${port}`) });