                    
                    
                    
                    // USERS ROUTES



            // IMPORTS AND SETUP



const express = require('express');
const router = new express.Router();
const { ensureCorrectUserOrAdmin, ensureAdmin, ensureLoggedIn, authenticateJWT } = require('../middleware/auth');
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
router.get('/:username', ensureCorrectUserOrAdmin, async (req,res,next) => {
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
 router.patch("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
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
 * Returns {deleted: USERNAME}
 **/
router.delete('/:username', ensureCorrectUserOrAdmin, async (req,res,next) => {
    try{
        const results = await User.delete(req.params.username)
        return res.json({deleted: req.params.username})
    }
    catch(e){
        next(e)
    }
})

/**
 * GET '/users/:username/accounts
 * 
 * Retrieve the banking accounts for a given username
 * 
 * Authorization: Admin or Same User
 * Returns: {accounts: [...]}
 **/
router.get('/:username/accounts', ensureCorrectUserOrAdmin, async(req,res,next) => {
    console.log('/username/accounts')
    try{
        console.log('/username/accounts')
        const results = await User.getAccounts(req.params.username)
        return res.json({accounts: results})
    }
    catch(e){
        next(e)
    }
});

router.post('/:username/account', async (req,res,next) => {
    try{
        const {username} = req.params
        console.log('/users/:username/account req.body: ', req.body)

        let accountObj = {
            username: req.body.username,
            balance: req.body.balance,
            open_date: req.body.open_date,
            account_type: req.body.account_type,
            interest: req.body.interest
        }
        const results = await User.createAccount(accountObj)
        return res.status(201).json({account: results})
    }   
    catch(e){
        next(e)
    }
});

router.delete('/:username/account/:id', ensureCorrectUserOrAdmin, async(req,res,next) => {
    try{
        const {id} = req.params
        const results = await User.removeAccount(id)
        return res.json({deleted: id})
    }
    catch(e){
        next(e)
    }
})


module.exports = router;