


                    // CUSTOM ERROR HANDLING CLASS



class ExpressError extends Error{
    constructor(msg, status){
        super();
        this.msg = msg;
        this.status = status;

        //stack property defined on every Error instance
        console.error(this.stack)
    }
}

module.exports = ExpressError;