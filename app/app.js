// app.js

var express = require('express');
var app = express();
var path = require('path');
//var jwt=require('jsonwebtoken');
//const jwt=require('../Middleware/jwt');
const jwt=require('../autenticazione/Middleware/jwt');

//const routerLogin=require('./Routing/loginRouter');
//const mid=require('./Middleware/mid');

//const routerLogin=require('../autenticazione/Routing/loginRouter');
//const mid=require('../autenticazione/Middleware/mid');





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
  res.sendFile(path.join(__dirname + '/../public/listapersonehtmlv1.html'));
});

app.get("/api/v2/listapersonehtml", function (req, res) {
  res.sendFile(path.join(__dirname + '/../public/listapersonehtmlv2.html'));
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

app.get("/api/v1/inseriscipersona", function (req, res) {
  res.sendFile(path.join(__dirname + '/../public/inseriscipersona.html'));
});

app.post("/api/v1/inseriscipersona", function (req, res) {

  const persona = new personaModello({ Cognome: req.body.cognome, Nome: req.body.nome, Anno: req.body.anno });

  persona.save(function (err) {
    if (err) return console.error(err);
    console.log("Inserimento effettuato");
  });
  res.send("Inserito in mongo");
  console.log("Inserito in mongo");

});

// post per applicazione Vue
app.post("/api/v2/inseriscipersona", function (req, res) {

  const persona = new personaModello({ Cognome: req.body.cognome, Nome: req.body.nome, Anno: req.body.anno });

  persona.save(function (err) {
    if (err) return console.error(err);
    console.log("Inserimento effettuato");
  });
//  res.send("Inserito in mongo");
  console.log("Inserito in mongo");
//  window.location.reload();

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
  res.sendFile(path.join(__dirname + '/../public/selezionapersona.html'));
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
      console.log(doc.length);
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

app.get("/api/eliminapersona", function (req, res) {
  res.sendFile(path.join(__dirname + '/../vue/eliminapersona.html'));
});


/*
//Or we can protect specific endpoints, by associating the tockenChecker with specific url:

app.use('/api/v1/booklendings', tokenChecker);
...
// only requests matching '/api/v1/booklendings' have been authenticated by the tokenChecker
app.use('/api/v1/booklendings', booklendings);
// Requests on '/api/v1/students' are not authenticated
app.use('/api/v1/students', books);
*/


/*
app.use('/api/v1/autenticazione', autenticazione);
app.use('/api/v1/autenticazione', tokenChecker);
app.get("/api/v1/autenticazione", function (req, res) {
  res.sendFile(path.join(__dirname + '/../public/listapersonehtmlv1.html'));
});
*/

// const express=require('express');
const routerLogin=require('../autenticazione/Routing/loginRouter');
const mid=require('../autenticazione/Middleware/mid');
// const app=express();

app.use(express.json());

app.use('/login',routerLogin);

/*
app.get('/foto',[mid.checkAuth],(req,res) => {
    res.end("Sono la home");
});
*/

app.get("/api/v1/generatoken", function (req, res) {
  res.sendFile(path.join(__dirname + '/../autenticazione/formautenticazione.html'));
});

app.post("/api/v1/generatoken", function (req, res) {
  console.log(req.body.username,req.body.password);
  if (req.body.username=='pippo'){
      let token=jwt.setToken(2,req.body.username);
      let payload=jwt.getPayload(token);
      res.json({ token:token,payload:payload});



//    console.log(mid.checkAuth);

  } else {
      res.sendStatus(401);
  }

});


app.get("/api/v1/validatoken", function (req, res) {
  res.sendFile(path.join(__dirname + '/../autenticazione/validazionetoken.html'));
});

app.get('/api/v1/foto',[mid.checkAuth],(req,res) => {

  console.log("Getfoto");

  res.end("Sono la home");
});


/*
  const persona = new personaModello({ Cognome: req.body.cognome, Nome: req.body.nome, Anno: req.body.anno });

  persona.save(function (err) {
    if (err) return console.error(err);
    console.log("Inserimento effettuato");
  });
  res.send("Inserito in mongo");
  console.log("Inserito in mongo");
*/






module.exports = app;