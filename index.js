// index.js - ProgettoIng2 - Carraro Francesco

var express = require('express');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Definisco il file app.js
const app = require('./app/app.js');

// Definisco la connessione a mongo
mongodb = require('./app/mongodbconnection.js');

// Puntatore alla home page httop presente in /public
app.use('/', express.static('public'));

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
console.log('Sono in ascolto sulla porta ' + app.get('port') );
});