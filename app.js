const express = require('express');

const app = express();
const port = '3000';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/27017', function (err) {
    if (err) throw err;
    console.log('Successfully connected');
});

// get the route
const route = require('./route/todo.route');

app.route(route);

app.listen(port, () => {
    console.log(`App running at ${port}`);
});
