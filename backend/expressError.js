


                    // CUSTOM ERROR HANDLING CLASSES



class ExpressError extends Error{
    constructor(msg, status){
        super();
        this.msg = msg;
        this.status = status;

        //stack property defined on every Error instance
        console.error(this.stack)
    }
}

/** 404 NOT FOUND error. */
class NotFoundError extends ExpressError {
    constructor(message = "Not Found") {
        super(message, 404);
    }
  }
  
/** 401 UNAUTHORIZED error. */
class UnauthorizedError extends ExpressError {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}
  
/** 400 BAD REQUEST error. */
class BadRequestError extends ExpressError {
    constructor(message = "Bad Request") {
        super(message, 400);
    }
}
  
/** 403 BAD REQUEST error. */
class ForbiddenError extends ExpressError {
    constructor(message = "Bad Request") {
        super(message, 403);
    }
}
  
module.exports = {
    ExpressError,
    NotFoundError,
    UnauthorizedError,
    BadRequestError,
    ForbiddenError,
};
