var jwt=require('jsonwebtoken');
let fs= require('fs');
let option=
{
    algorithm:"RS256",
    expiresIn:"8h"
}


let getPayload=(token)=>{
    var decode=jwt.decode(token,{complete:true});
    return decode.payload;
}

let setToken=(id,username) => {
    let payload= {id: id,username: username};
    let chiavePrivata = fs.readFileSync(__dirname+'/rsa.key');
    var token=jwt.sign(payload,chiavePrivata, option);
    return token;
}

let checkToken=(token)=>{
    let chiavePubblica = fs.readFileSync(__dirname+'/rsa.pem');
    jwt.verify(token,chiavePubblica, option);
}

module.exports = {
    setToken,
    getPayload,
    checkToken
}