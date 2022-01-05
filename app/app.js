// app.js

var express = require('express');
var app = express();
var path = require('path');

var bodyParser = require('body-parser');
const { Mongoose } = require('mongoose');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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

app.get("/api/v1/listapersonehtml", function (req, res) {
  res.sendFile(path.join(__dirname + '/listapersonehtmlv1.html'));
});

app.get("/api/listapersonejson", async (req, res, next) => {
  try {
    const query1 = personaModello.find();
    const result1 = await query1.exec();
    res.status(200).send(result1);

  } catch (err) {
    next(err);
  }
})

app.get("/api/inseriscipersona", function (req, res) {
  res.sendFile(path.join(__dirname + '/inseriscipersona.html'));
});

app.post("/api/inseriscipersona", function (req, res) {

  const persona = new personaModello({ Cognome: req.body.cognome, Nome: req.body.nome, Anno: req.body.anno });

  persona.save(function (err) {
    if (err) return console.error(err);
    console.log("Inserimento effettuato");
  });
  res.send("Inserito in mongo");
  console.log("Inserito in mongo");

});

// non ritorna nessun messaggio d'errore se non trova l'item
app.get("/api/persona/:id", (req, res) => {
  id = req.params.id - 1; // sottraggo 1 in quanto l'indice dell'array parte da 0
  personaModello.find().exec((err, doc) => {
    if (doc.length > 0) {
      res.send(doc[id]);
    } else {
      res.send("Nessun record presente");
      console.log("Nessun record presente");
    }

  });

})




app.get("/api/selezionapersona", function (req, res) {
  res.sendFile(path.join(__dirname + '/selezionapersona.html'));
});


/*
Elimina versione1 -> se non trova l'elemento, oppure il database è vuoto blocca l'esecuzione del server
*/
app.get('/api/v1/elimina/:id', function (req, res) {
  var cognome = req.params.id;
  personaModello.findOneAndDelete({ Cognome: cognome }).exec((err, doc) => {
    if ((doc!=null) && (doc.length > 0)) {
      res.send("RES KO"); // non viene stampato
    } else {
      res.send("RES OK");
      console.log(doc.lenght);
    }

  });
})

app.get('/api/elimina/:id', function (req, res) {

  id = req.params.id - 1; // sottraggo 1 in quanto l'indice dell'array parte da 0
  personaModello.find().exec((err, doc) => {
    if (doc.length > 0) {
      console.log("Trovato");
      console.log(doc[id]);
      console.log(doc.lenght);
    } else {
      console.log("Non trovato");
      console.log(doc[id]);
      console.log(doc.lenght);
    }

  });

})




module.exports = app;