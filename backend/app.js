                    
                    
                    
                    // EXPRESS APP FOR LIGHTWIRE



            // IMPORTS AND SETUP



const express = require('express');
const ExpressError = require('./expressError')
const morgan = require('morgan')
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
const {authenticateJWT} = require('./middleware/auth')
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))
app.use(authenticateJWT)
app.use('/users', userRoutes)
app.use('/auth', authRoutes)



            // MAIN ROUTES


/**
 * LANDING
 **/
app.get('/', function(req,res){
    return res.json({msg: 'Welcome to LightWire!'})
})



            //ERROR HANDLING



/**
 * 404 ERROR HANDLER ONLY IF NO ROUTES ARE MATCHED
 **/
app.use((req,res,next) => {
    const e = new ExpressError("Page Not Found.", 404)
    next(e)
})

/**
 * MAIN ERROR HANDLER
 **/
app.use((error, req, res, next) => {

    //Defaults
    let status = error.status || 500;
    let msg = error.msg || 'No message included.'

    res.json({error: {status: status, msg: msg}, stack: error.stack})
})



module.exports = app;
