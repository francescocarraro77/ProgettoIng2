var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URI;

MongoClient.connect(url, function(err, db) {
   if (err) throw err;
   var myquery = {
      name: 'Rohit'
   };
   db.collection("students").deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
   });
});