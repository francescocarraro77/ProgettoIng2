// index.js - ProgettoIng2 - Carraro Francesco
// 2

var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function (req, res) {
res.send('Hello World!');
});

app.listen(app.get('port'), function () {
console.log('Sono in ascolto sulla porta ' + app.get('port') );
});