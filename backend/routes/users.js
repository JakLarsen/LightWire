                    
                    
                    
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
 * Get a user by username
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
 * Can update users by first_name, last_name, email, phone
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

/**
 * POST '/users/:username/account
 * 
 * Create a new account for a given username
 * 
 * Authorization: Admin or Same User
 * Returns: {account: {username: USERNAME, ...}}
 **/
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

/**
 * PATCH '/users/:username/account/:id
 * 
 * Update account balances after calling to create a transaction
 * 
 * Authorization: Admin or Same User
 * Returns: 
 **/
router.patch(`/:username/account/:id`, async (req,res,next) => {
    try{
        const accountObj = {
            acc_receiving_id: req.body.acc_receiving_id,
            acc_sending_id: req.body.acc_sending_id,
            amount: req.body.amount
        }
        console.log(accountObj)
        const results = await User.updateBalances(accountObj)
        return res.json({transaction_complete: results})
    }
    catch(e){
        next(e)
    }
});

/**
 * POST '/users/:username/account/:id/transaction
 * 
 * Create a new transaction for a given account id
 * 
 * Authorization: Admin or Same User
 * Returns: }
 **/
router.post('/:username/account/:id/transaction', async (req,res,next) => {
    // console.log('IN BACKEND TRANSACTIONS ROUTE')
    try{
        let accountObj = {
            acc_receiving_id: req.body.acc_receiving_id,
            acc_sending_id: req.body.acc_sending_id,
            amount: req.body.amount,
            transaction_date: req.body.transaction_date
        }
        const results = await User.createTransaction(accountObj)
        const transaction_results = results[0]

        return res.json(
            {
                transaction_complete: {
                    id: transaction_results.id,
                    acc_receiving_id: transaction_results.acc_receiving_id,
                    acc_sending_id: transaction_results.acc_sending_id,
                    amount: transaction_results.amount,
                    transaction_date: transaction_results.transaction_date
                } 
            }
        )
    }
    catch(e){
        next(e)
    }
});

/**
 * DELETE '/users/:username/account/:id
 * 
 * Delete an account for a given username
 * 
 * Authorization: Admin or Same User
 * Returns: {deleted: ACCOUNT_ID}
 **/
router.delete('/:username/account/:id', ensureCorrectUserOrAdmin, async(req,res,next) => {
    try{
        const {id} = req.params
        const results = await User.removeAccount(id)
        return res.json({deleted: id})
    }
    catch(e){
        next(e)
    }
});



module.exports = router;