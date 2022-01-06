global.fetch = require("node-fetch");
/*
fetch("http://www.html.it")
   .then(response => {
      console.log(response);
   })
   .catch(error => console.log("Si è verificato un errore!"))
*/


   fetch('//api.github.com/users/lquixada')
   .then(res => {
     if (res.status >= 400) {
       throw new Error("Bad response from server");
     }
     return res.json();
   })
   .then(user => {
     console.log(user);
   })
   .catch(err => {
     console.error(err);
   });