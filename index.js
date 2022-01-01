// index.js - ProgettoIng2 - Carraro Francesco

var express = require('express');

// Definisco 
const app = require('./app/app.js');

// Puntatore alla home page httop presente in /public
app.use('/', express.static('public'));

app.set('port', process.env.PORT || 3000);


app.listen(app.get('port'), function () {
console.log('Sono in ascolto sulla porta ' + app.get('port') );
});