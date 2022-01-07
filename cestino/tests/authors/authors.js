var express = require('express');
var app = express();

app.get("/api/authors", function (req, res) {
    res.sendFile(path.join(__dirname + '/authors.html'));
  });