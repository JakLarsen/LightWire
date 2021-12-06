                    
                    
                    
                    // AUTH MIDDLEWARE



            // IMPORTS AND SETUP



const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const { ExpressError } = require('../expressError');



            // MIDDLEWARE FUNCTIONS

            

/**
 * Authorization middleware runs before each route.
 * 
 * If an authorization header exists, authenticates an authorization header token.
 * Places the payload data {username: USERNAME, admin: true/false, iat: ### } on res.locals.user
 */
function authenticateJWT(req,res,next){
    console.log('Running AUTHENTICATEJWT')
    console.log(req.headers.authorization)
    try{
        const authHeader = req.headers && req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace(/^[Bb]earer /, "").trim();
            console.log('TOKEN', token)
            res.locals.user = jwt.verify(token, SECRET_KEY);
            console.log('res.locals.user', res.locals.user)
        }
        return next()
    }
    catch(e){
        console.log('NEXT')
        next()
    }
}

/**
 * Authorization middleware authenticates a valid user token or
 * Returns 401 if not logged in.
 */
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

/**
 * Authorization middleware authenticates a valid user token AND admin: true in payload stored on res.locals.user
 * Returns 401 if not admin.
 */
function ensureAdmin(req, res, next) {
    if (!res.locals.user || !res.locals.user.admin) {
        const e = new ExpressError('Unauthorized attempt to reach endpoint. Not Admin.', 401)
        return next(e);
    }
    else{
        return next();
    }
}

/**
 * Authorization middleware authenticates a valid SAME user token OR admin: true in payload stored on res.locals.user
 * Returns 401 if not same user or admin.
 */
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

