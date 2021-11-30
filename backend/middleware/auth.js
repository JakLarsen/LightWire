                    
                    
                    
                    // AUTH MIDDLEWARE



            // IMPORTS AND SETUP



const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const { ExpressError } = require('../expressError');



            // MIDDLEWARE FUNCTIONS



function authenticateJWT(req,res,next){
    console.log('Running AUTHENTICATEJWT')
    console.log(req.headers.authorization)
    try{
        const authHeader = req.headers && req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace(/^[Bb]earer /, "").trim();
            console.log(token)
            res.locals.user = jwt.verify(token, SECRET_KEY);
            console.log(res.locals.user)
        }
        return next()
    }
    catch(e){
        console.log('NEXT')
        next()
    }
}

function ensureLoggedIn(req,res,next){
    console.log('RUNNING ENSURELOGGEDIN res.locals.user: ', res.locals.user)
    if (!res.locals.user){
        const e = new ExpressError('Unauthorized attempt to reach endpoint: Not Logged-in', 401)
        return next(e);
    }
    else{
        return next();
    }
}

function ensureAdmin(req, res, next) {
    if (!res.locals.user || !res.locals.user.admin) {
        const e = new ExpressError('Unauthorized attempt to reach endpoint. Not Admin.', 401)
        return next(e);
    }
    else{
        return next();
    }
}

function ensureCorrectUserOrAdmin(req, res, next) {
    console.debug('Checking ENSURECORRECTUSERORADMIN req.body: ', req.body)
    if (!(res.locals.user && (res.locals.user.admin || res.locals.user.username === req.params.username))) {
        const e = new ExpressError('Unauthorized attempt to reach endpoint. Not Same User or Admin.', 401)
        return next(e);
    }
    else{
        return next();
    }
}



module.exports = {authenticateJWT, ensureLoggedIn, ensureAdmin, ensureCorrectUserOrAdmin}

