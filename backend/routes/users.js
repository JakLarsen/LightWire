                    
                    
                    
                    // USERS ROUTES



            // IMPORTS AND SETUP



const express = require('express');
const router = new express.Router();
const db = require('../db')
const {checkForPassword} = require('../middleware/examples')
const {User} = require('../models/user')



            //USERS ROUTES



/**
 * GET '/users'
 * Authorization: Admin
 **/
router.get('/', async (req,res,next) => {
    try{
        const users = await User.getAll()
        return res.json({users: users})
    }
    catch(e){
        return next(e);
    }
})

/**
 * GET '/users/:username'
 * Authorization: Admin or Same User
 **/
router.get('/:username', (req,res,next) => {
    try{
        
    }
    catch(e){
        return next(e);
    }  
})

/**
 * POST '/users' is taken care of by POST '/auth/register'
 */

/**
 * PATCH '/users/:username'
 * Authorization: Admin or Same User
 **/
router.patch('/:username', (req,res) => {
    try{
        
    }
    catch(e){
        next(e)
    }
})

/**
 * DELETE '/users/:username
 * Authorization: Admin or Same User
 **/
router.delete('/:username', (req,res) => {
    try{
        
    }
    catch(e){
        next(e)
    }
})

module.exports = router;