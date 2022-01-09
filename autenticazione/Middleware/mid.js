const jwt=require('./jwt');
const fs= require('fs');

const option=
{
    algorithm:"RS256",
    expiresIn:"8h"
}

/*
// versione originale col passaggio del token nell'header
const checkAuth=(req,res,next)=>{
    try{
        if(req.headers['authorization']==null){
            res.sendStatus(401);
        } else {
            let token=req.headers['authorization'];
            token=token.slice(7,token.length);
            jwt.checkToken(token);
            next();
        }
    }catch(err){
        console.log(err.message);
        res.sendStatus(401);
    }

}*/


// questa versione permette di passare il token nei parametri anzichè nell'header
const checkAuth=(req,res,next)=>{
    try{
        if(1!=1){
            res.sendStatus(401);
        } else {
            let token=req.body.token;
            console.log(token);
            token=token.slice(7,token.length);
            jwt.checkToken(token);
            next();
        }
    }catch(err){
        console.log(err.message);
        res.sendStatus(401);
    }

}


module.exports={
    checkAuth
}