                    
                    
                    
                    // EXPRESS APP FOR LIGHTWIRE



            // IMPORTS AND SETUP



const express = require('express');
const ExpressError = require('./expressError')
const morgan = require('morgan')
const userRoutes = require('./routes/users')

const app = express();
app.use(express.json());
app.use(morgan('dev'))
app.use('/users', userRoutes)



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


// //Test route for errors and error handling.
// app.get('/errors/:code', function(req, res, next){
//     const {code} = req.params
//     try{
//         if(code == 404){
//             throw new ExpressError(`Sorry, can't find what you're looking for.`, 404);
//         }
//         else if(code == 403){
//             throw new ExpressError("Error test - Not found.", 403)
//         }
//         else if(code == 500){
//             throw new Error;
//         }
//         else{
//             return res.status(200).json({code: id})
//         }
//     }
//     catch(e){
//         return next(e)
//     }
// })

// app.get('/search', function(req,res){
//     //Can search for a 'transaction'
//     const {transaction} = req.query 
//     return res.json({msg:`You searched for the following transaction: ${transaction}.`})
// })
// app.get('/showheaders', function(req,res){
//     return res.send(req.headers)
// })
// app.post('/register', function(req,res){
//     return res.status(201).send(req.body)
// })