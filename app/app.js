// app.js

// Definisco il sistema
var express = require('express');
var app = express();
var path = require('path');
const jwt=require('../autenticazione/Middleware/jwt');
var bodyParser = require('body-parser');
const { Mongoose } = require('mongoose');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
const routerLogin=require('../autenticazione/Routing/loginRouter');
const mid=require('../autenticazione/Middleware/mid');
app.use(express.json());
//app.use('/login',routerLogin);


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

// Ritorna la lista delle persone in formato JSON
app.get("/api/listapersonejson", async (req, res, next) => {
  try {
    const query1 = personaModello.find();
    const result1 = await query1.exec();
    res.status(200).send(result1);

  } catch (err) {
    next(err);
  }
})

// Apre una pagina web che visualizza in html la lista delle persone inserite in DB
app.get("/api/v1/listapersonehtml", function (req, res) {
  res.sendFile(path.join(__dirname + '/../public/listapersonehtmlv1.html'));
});

// Apre una pagina web che permette l'inserimento di una persona in DB
app.get("/api/v1/inseriscipersona", function (req, res) {
  res.sendFile(path.join(__dirname + '/../public/inseriscipersona.html'));
});

// (V1) Metodo chiamato da /public/inseriscipersona.html, inserisce una persona in DB  
app.post("/api/v1/inseriscipersona", function (req, res) {
  const persona = new personaModello({ Cognome: req.body.cognome, Nome: req.body.nome, Anno: req.body.anno });
  persona.save(function (err) {
    if (err) return console.error(err);
    console.log("Inserimento effettuato");
  });
  res.send("Inserito in mongo");
  console.log("Inserito in mongo");
});


// (V2) Post per applicazione Vue
app.post("/api/v2/inseriscipersona", function (req, res) {
  const persona = new personaModello({ Cognome: req.body.cognome, Nome: req.body.nome, Anno: req.body.anno });
  persona.save(function (err) {
    if (err) return console.error(err);
    console.log("Inserimento effettuato");
  });
  console.log("Inserito in mongo");
});


// Metodo per visualizzare una singola persona in base all'ID
// nel caso in cui non sia presente la persona ritorna null
app.get("/api/v1/persona/:id", (req, res) => {
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

// Form VUE per inserire ed eliminare item
app.get("/api/eliminapersona", function (req, res) {
  res.sendFile(path.join(__dirname + '/../vue/eliminapersona.html'));
});


//Elimina versione1 -> se non trova l'elemento, oppure il database è vuoto blocca l'esecuzione del server
app.get('/api/v1/elimina/:id', function (req, res) {
  var cognome = req.params.id;
  personaModello.findOneAndDelete({ Cognome: cognome }).exec((err, doc) => {
    if ((doc!=null && (doc.length > 0)) ) { 
      res.send("RES KO"); // non viene stampato
    } else {
      res.send("RES OK");
      console.log(doc.length);
    }
  });
})

/*
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
*/



// Apre la pagina web per inserire user e password per generare un token
app.get("/api/v1/generatoken", function (req, res) {
  res.sendFile(path.join(__dirname + '/../autenticazione/formautenticazione.html'));
});

// Risponde al metodo precedente in formato json ritornando il token
app.post("/api/v1/generatoken", function (req, res) {
  console.log(req.body.username,req.body.password);
  if (req.body.username=='pippo'){
      let token=jwt.setToken(2,req.body.username);
      let payload=jwt.getPayload(token);
      res.json({ token:token,payload:payload});
    console.log(token);
  } else {
      res.sendStatus(401);
  }
});

// Apre la pagina web per validare il token ed effettuare il wipe della collezione Anagrafica
app.get("/api/v1/validatoken", function (req, res) {
  res.sendFile(path.join(__dirname + '/../autenticazione/validazionetoken.html'));
});

// Effettua il wipe del DB passando prima per il middleware mid.checkAuth
app.post('/api/v1/wipedb',[mid.checkAuth],(req,res) => {
personaModello.deleteMany({}).exec((err, doc) => {
  res.send("Wipe effettuato!");
});
});

module.exports = app;

