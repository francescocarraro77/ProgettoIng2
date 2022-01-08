const express=require('express');
const routerLogin=require('./Routing/loginRouter');
const mid=require('./Middleware/mid');
const app=express();

app.use(express.json());

app.use('/login',routerLogin);


app.get('/foto',[mid.checkAuth],(req,res) => {
    res.end("Sono la home");
});


app.listen('3000',()=>console.log("Sono in ascolto"));