                    
                    
                    
                    // AUTH ROUTES



            // IMPORTS AND SETUP



const express = require('express');
const router = new express.Router();
const db = require('../db')
const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR } = require('../config');
const {User} = require('../models/user')



            //AUTH ROUTES



/**
 * GET '/auth'
 * Testing Router
 * Authorization: None
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
 * Authorization: None
 **/
 router.post('/register', async (req,res,next) => {
    try{
        const {username, password, first_name, last_name, email, phone} = req.body
            const userObj = {
                username: username,
                password: password,
                first_name: first_name,
                last_name: last_name,
                email: email,
                phone: phone
            }
        const newUser = await User.register(userObj)
        console.log(newUser)
        return res.json({registered: newUser})
    }
    catch(e){
        return next(e);
    }
});



module.exports = router;
