                    
                    
                    
                    // USERS ROUTES



            // IMPORTS AND SETUP



const express = require('express');
const router = new express.Router();
const db = require('../db')
const {checkForPassword} = require('../middleware/examples')



            //USERS ROUTES



/**
 * GET '/users'
 * Authorization: Admin
 **/
router.get('/', async (req,res,next) => {
    try{
        const results = await db.query(
            `SELECT * FROM users`
        )
        return res.json({users: results.rows})
    }
    catch(e){
        return next(e);
    }
})

/**
 * GET '/users/id
 * Authorization: Admin or Same User
 **/
router.get('/:id', (req,res,next) => {
    try{
        let USERS = ['1','2']
        const {id} = req.params
        const user = USERS.find(user => user === id)
        return res.json({user: user})
    }
    catch(e){
        return next(e);
    }  
})

/**
 * POST '/users
 * Authorization: Admin
 **/
router.post('/', (req,res) => {

})

/**
 * PATCH '/users/id
 * Authorization: Admin or Same User
 **/
router.patch('/:id', (req,res) => {

})

/**
 * DELETE '/users/id
 * Authorization: Admin or Same User
 **/
router.delete('/:id', (req,res) => {

})

module.exports = router;