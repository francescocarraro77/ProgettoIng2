// app.js

var express = require('express');
var app = express();
var path = require('path');


// test senza un metodo preciso (funziona con qualsiasi metodo)
app.all('/alltest', function (req, res, next) {
  console.log('All test');
  res.send('All test');
  next();
});

// test con get -> visibile da browser
app.get('/gettest', function (req, res) {
  console.log('Get test');
  res.send('Get test');
});

// test con post
app.post('/getpost', function (req, res) {
  console.log('Get post');
  res.send('Get post');
});

app.get("/api/listapersonehtml", function(req, res) {
  res.sendFile(path.join(__dirname + '/listapersonehtml.html'));
});

app.get("/api/listapersonemongo", async (req, res, next) => {
  try {
    const query1 = personaModello.find();
    const result1 = await query1.exec();
    res.status(200).send(result1);
    
} catch (err) {
    next(err);
  }
})


module.exports = app;