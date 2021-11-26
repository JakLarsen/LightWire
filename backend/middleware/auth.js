                    
                    
                    
                    // AUTH MIDDLEWARE



            // IMPORTS AND SETUP



const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const { ExpressError } = require('../expressError');



            // MIDDLEWARE FUNCTIONS



function authenticateJWT(req,res,next){
    try{
        let payload = jwt.verify(req.body._token, SECRET_KEY)
        req.user = payload
        console.log('YOU HAVE A VALID TOKEN')
        return next()
    }
    catch(e){
        next()
    }
}

function ensureLoggedIn(req,res,next){
    if (!req.user){
        const e = new ExpressError('Unauthorized attempt to reach endpoint: Not Logged-in', 401)
        return next(e);
    }
    else{
        return next();
    }
}

function ensureAdmin(req, res, next) {
    console.log(req.user)
    if (!req.user || !req.user.admin) {
        const e = new ExpressError('Unauthorized attempt to reach endpoint. Not Admin.', 401)
        return next(e);
    }
    else{
        return next();
    }
}



module.exports = {authenticateJWT, ensureLoggedIn, ensureAdmin}

