const ExpressError = require("../expressError");




function checkForPassword(req,res,next){
    try{
       if (req.query.password !== 'monkey'){
           throw new ExpressError('Invalid Password.', 402)
       } 
       else{
           return next()
       }
    }
    catch(e){
        console.log()
        return next(e)
    }
}

module.exports = { checkForPassword }