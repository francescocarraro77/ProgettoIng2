var express = require('express');
var app = express();

const helloworld = require('./helloworld.js');

// const somma = require('./somma');

app.all('/test1', function (req, res, next) {
    console.log('Test1');
    res.send('Test1');
    next(); // pass control to the next handler
  });

app.get('/helloworld', function (req, res) {
    console.log('Hello World! Heroku+Git');
    res.send('Hello World! Heroku+Git');
    });

module.exports = app;