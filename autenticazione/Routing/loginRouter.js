const express=require('express');
const jwt=require('../Middleware/jwt');



const router=express.Router();

router.post('/',(req,res)=> {
    console.log(req.body.username,req.body.password);
    if (req.body.username=='pippo'){
        let token=jwt.setToken(2,req.body.username);
        let payload=jwt.getPayload(token);
        res.json({ token:token,payload:payload});
    } else {
        res.sendStatus(401);
    }

});

module.exports=router;