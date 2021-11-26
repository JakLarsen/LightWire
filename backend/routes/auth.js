                    
                    
                    
                    // AUTH ROUTES



            // IMPORTS AND SETUP



const express = require('express');
const router = new express.Router();
const {User} = require('../models/user')
const { BadRequestError, ForbiddenError } = require("../expressError");
const userRegisterSchema = require("../schemas/userRegister.json");
const userAuthSchema = require("../schemas/userLogin.json");
const jsonschema = require('jsonschema')
const {createToken} = require('../helpers/tokens');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const {ensureLoggedIn, ensureAdmin} = require('../middleware/auth')



            //AUTH ROUTES



/**
 * GET '/auth'
 * 
 * Testing Route Access
 * 
 * Authorization: None
 * Returns {msg: "You hit the /auth route!"}
 **/
router.get('/', (req,res,next) => {
    try{
        return res.json({msg: "You hit the /auth route!"})
    }
    catch(e){
        return next(e);
    }
});

/**
 * POST '/auth/register'
 * 
 * Register a new user
 * Requires {username: USERNAME, password: PASSWORD, first_name: FIRSTNAME, email: EMAIL, phone: PHONE}
 * 
 * Authorization: None
 * Returns {registered: USERNAME, _token: TOKEN}
 **/
router.post('/register', async (req,res,next) => {
    try{
        const validator = jsonschema.validate(req.body, userRegisterSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const newUser = await User.register({...req.body})
        const token = createToken(newUser)
        return res.status(201).json(
            {
                registered: req.body.username,
                _token: token
            }
        );
    }
    catch(e){
        return next(e);
    }
});


/**
 * POST '/auth/login'
 * 
 * Login a new user
 * Requires {username: USERNAME, password: PASSWORD}
 * 
 * Authorization: User +
 * Returns {logged_in: USERNAME, _token: TOKEN}
 **/
router.post('/login', async (req,res,next)=>{
    try{
        const validator = jsonschema.validate(req.body, userAuthSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const { username, password } = req.body;
        const user = await User.authenticate(username, password)
        const token = createToken(user);
        return res.status(200).json(
            {
                logged_in: username, 
                _token: token,
                admin: user.is_admin
            }
        );
    }
    catch(e){
        next(e)
    }
});

/**
 * GET '/auth/testlogin'
 * 
 * Tests token authorization for logged-in endpoint security
 * 
 * Authorization: Logged-in +
 * Returns {msg: 'You hit a logged-in endpoint! Welcome, USERNAME.'}
 **/
router.get('/testlogin', ensureLoggedIn, async (req,res,next)=>{
    try{
        return res.status(200).json({msg: `You hit a logged-in endpoint! Welcome, ${req.user.username}`})
    }
    catch(e){
       next(e)
    }
})

/**
 * GET '/auth/testadmin'
 * 
 * Tests authorization for admin endpoint security
 * 
 * Authorization: Admin +
 * Returns {msg: 'You hit an admin endpoint! Welcome, USERNAME.'}
 **/
 router.get('/testadmin', ensureAdmin, async (req,res,next)=>{
    try{
        return res.status(200).json({msg: `You hit an admin endpoint! Welcome, ${req.user.username}`})
    }
    catch(e){
       next(e)
    }
})



module.exports = router;
