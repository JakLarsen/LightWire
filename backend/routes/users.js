                    
                    
                    
                    // USERS ROUTES



            // IMPORTS AND SETUP



const express = require('express');
const router = new express.Router();
const { ensureCorrectUserOrAdmin, ensureAdmin } = require('../middleware/auth');
const {User} = require('../models/user')
const {BadRequestError} = require('../expressError')
const jsonschema = require('jsonschema')
const userUpdateSchema = require('../schemas/userUpdate.json')



            //USERS ROUTES



/**
 * GET '/users'
 * 
 * Authorization: Admin
 * Returns {users: [{username: USERNAME, ...},...]}
 **/
router.get('/', ensureAdmin, async (req,res,next) => {
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
 * 
 * Authorization: Admin or Same User
 * Returns {user: {username: USERNAME, ...}
 **/
router.get('/:username',ensureCorrectUserOrAdmin, async (req,res,next) => {
    try{
        const {username} = req.params
        const user = await User.getByUsername(username)
        return res.json({user: user}) 
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
 * 
 * Can update first_name, last_name, email, phone
 * 
 * Authorization: Admin or Same User
 * Returns {user: {username: USERNAME, ...}
 **/
 router.patch("/:username",ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        const userObj = {
            ...req.body
        }
        delete userObj._token
        const validator = jsonschema.validate(req.body, userUpdateSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const user = await User.update(req.params.username, userObj);
        return res.json({ user });
    } 
    catch (err) {
        return next(err);
    }
});

/**
 * DELETE '/users/:username
 * 
 * Authorization: Admin or Same User
 **/
router.delete('/:username',ensureCorrectUserOrAdmin, (req,res) => {
    try{
        
    }
    catch(e){
        next(e)
    }
})

module.exports = router;