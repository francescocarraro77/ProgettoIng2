// mongodbconnection.js

const mongoose = require('mongoose');

// stringa di connessione heroku
const uri = process.env.MONGODB_URI;

let dbURI = 'mongodb+srv://User:Useraccess@cluster0.dd8e5.mongodb.net/DBAnagrafica?retryWrites=true&w=majority';
if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGODB_URI;
}
mongoose.connect(dbURI, {
  useNewUrlParser: true,
});

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});


const { Schema } = mongoose;

const personaSchema = new mongoose.Schema({
  Id: Number, // String is shorthand for {type: String}
  Cognome: String,
  Nome: String,
  Anno: Number
});

personaModello = mongoose.model('Anagrafica', personaSchema);








