                    
                    
                    
                    // TESTING - USER MODEL



            // IMPORTS AND SETUP



"use strict";

const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
    ExpressError,
} = require("../expressError");
const db = require("../db.js");
const {User} = require("./user.js");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);



            // TESTS


     
/**
 * User.authenticate()
 */
describe('User.authenticate()', function() {
    test('Correct username and password returns user obj', async function(){
        const authenticateResults =  await User.authenticate('testuser', 'password')
        expect(authenticateResults).toEqual(
            {
                username: "testuser",
                first_name: 'Test',
                last_name: "User",
                email: 'testuser@test.com',
                phone: '123-456-7890',
                is_admin: false
            }
        )
    });
    test('Incorrect password returns UnauthorizedError', async function(){
        try {
            await User.authenticate("testuser", "wrong-password");
            fail();
        } 
        catch (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy();
        }

    });
    test('Nonesistent username returns UnauthorizedError', async function(){
        try {
            await User.authenticate("testuser-incorrect-name", "password");
            fail();
        } 
        catch (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy();
        }
    });
});

/**
 * User.register()
 */
describe('User.register()', function(){
    //SETUP
    const newUser = {
        username: 'jimbob',
        password: 'password',
        first_name: 'Jim',
        last_name: 'Bob',
        email: 'jimbob@jimbob.com',
        phone: '1234567890'
    }

    //TESTS
    test('Works', async function() {
        const results = await User.register(newUser)
        expect(results).toEqual(
            {
                username: 'jimbob'
            }
        )
    });
    test('Throws BadRequestError if duplicate username', async function() {
        try {
            await User.register(newUser);
        } 
        catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });
});

/**
 * User.getAll()
 */
describe("User.getAll()", function () {
    test("Works", async function () {
        const users = await User.getAll();
        expect(users).toEqual(
            [
                {
                    username: "testadmin",
                    first_name: 'Test',
                    last_name: "Admin",
                    email: "testadmin@test.com",
                    phone: '123-456-7890',
                },
                {
                    username: "testuser",
                    first_name: 'Test',
                    last_name: "User",
                    email: 'testuser@test.com',
                    phone: '123-456-7890',
                },
            ]
        );
    });
});

/**
 * User.getByUsername()
 */
 describe("User.getByUsername()", function () {
    test("Works", async function () {
        const res = await User.getByUsername('testuser');
        expect(res).toEqual(
            {
                username: "testuser",
                first_name: 'Test',
                last_name: "User",
                email: 'testuser@test.com',
                phone: '123-456-7890',
            }
        );
    });
    test('Returns ExpressError if username doesnt exist', async function(){
        try{
            const res = await User.getByUsername('nonexistent-username');
        }
        catch(err){
            expect(err instanceof ExpressError).toBeTruthy();
        }
    })
});

/**
 * User.update()
 */
describe('User.update()', function(){
    test('Works for allowed parameters', async function(){
        const res = await User.update('testuser', {first_name: 'tu'})
        expect(res).toEqual(
            {
                username: "testuser",
                first_name: 'tu',
                last_name: "User",
                email: 'testuser@test.com',
                phone: '123-456-7890',
            }
        )
    });
    test('Returns ExpressError if attempt to adjust non-allowed parameters', async function(){
        try{
            const res = await User.update('testuserrr', {password: 'Jake'})
        }
        catch(e){
            expect(e instanceof ExpressError).toBeTruthy();
        }
    });
    test('Returns ExpressError if not valid user', async function(){
        try{
            await User.update('non-existent-username', {first_name: 'Jake'})
        }
        catch(e){
            expect(e instanceof ExpressError).toBeTruthy();
        }
    });
    test('Returns ExpressError if function breaks', async function(){
        try{
            const res = await User.update('testuserrr', {first_name: 'Jake'})
        }
        catch(e){
            expect(e instanceof ExpressError).toBeTruthy();
        }
    });
});

/**
 * User.delete()
 */
describe('User.delete()', function(){
    //SETUP
    const newUser = {
        username: 'jimbob',
        password: 'password',
        first_name: 'Jim',
        last_name: 'Bob',
        email: 'jimbob@jimbob.com',
        phone: '1234567890'
    }

    //TESTS

    test('Works for existing user', async function(){
        const results = await User.register(newUser)
        const res = await User.delete('jimbob')
        try{
            await User.getByUsername('jimbob')
        }
        catch(e){
            expect(e instanceof ExpressError).toBeTruthy();
        }
    });
    test('Throws ExpressError if username not found', async function(){
        try{
            await User.delete('cant-delete-me')
        }
        catch(e){
            expect(e instanceof ExpressError).toBeTruthy();
        }
    });
});

/**
 * User.createAccount()
 */
 describe('User.createAccount()', function(){
    test('Works for existing user', async function(){
        const now = new Date();
        const accountObj = {
            username: 'testuser', balance: 100, date:now, account_type: 'checking', interest: 0.01
        }
        const res = await User.createAccount(accountObj)
        expect(res).toEqual(
            [
                {
                    id: expect.any(Number),
                    user_id: expect.any(Number),
                    username: 'testuser',
                    balance: 100,
                    open_date: expect.any(Date),
                    account_type: 'checking',
                    interest: 0.01
                }
            ]
        )
    })
    test('Throws ExpressError if user doesnt exist', async function(){
        try{
            const now = new Date();
            const accountObj = {
                username: 'non-existent', balance: 100, date:now, account_type: 'checking', interest: 0.01
            }
            const res = await User.createAccount(accountObj)
        }
        catch(e){
            expect(e instanceof ExpressError).toBeTruthy();
        }
    });
});

/**
 * User.getAccounts()
 */
describe('User.getAccounts()', function(){
    test('Works for existing user', async function(){
        const now = new Date();
        const accountObj = {
            username: 'testuser', balance: 100, date:now, account_type: 'checking', interest: 0.01
        }
        const createRes = await User.createAccount(accountObj)
        const res = await User.getAccounts('testuser')
        expect(res).toEqual(
            [
                {
                    id: expect.any(Number),
                    username: 'testuser',
                    balance: 100,
                    open_date: expect.any(Date),
                    account_type: 'checking',
                    interest: 0.01
                }
            ]
        )
    });
    test('Throws ExpressError if user doesnt exist', async function(){
        try{
            const res = await User.getAccounts('non-existent')
        }
        catch(e){
            expect(e instanceof ExpressError).toBeTruthy();
        }
    });
});

/**
 * User.removeAccount()
 */
describe('User.removeAccount()', function(){
    test('Works for correct account id', async function(){
        const now = new Date();
        const accountObj = {
            username: 'testuser', balance: 100, date:now, account_type: 'checking', interest: 0.01
        }
        const createRes = await User.createAccount(accountObj)
        const getRes = await User.getAccounts('testuser')
        expect(getRes).toEqual(
            [
                {
                    id: expect.any(Number),
                    username: 'testuser',
                    balance: 100,
                    open_date: expect.any(Date),
                    account_type: 'checking',
                    interest: 0.01
                }
            ]
        )
        const ourAccount = getRes[0]
        const ourID = ourAccount.id
        const res = await User.removeAccount(ourID)
        const getRes2 = await User.getAccounts('testuser')
        expect(getRes2).toEqual([])
    });
    test('Throws ExpressError if account id doesnt exist', async function(){
        try{
            const res = await User.removeAccount(-1)
        }
        catch(e){
            expect(e instanceof ExpressError).toBeTruthy();
        }
    });
});

/**
 * User.createTransaction()
 */
describe('User.createTransaction()', function() {
    const now = new Date();
    const accountObjCreate = {
        username: 'testuser', balance: 100, date:now, account_type: 'checking', interest: 0.01
    }
    const accountObjCreate2 = {
        username: 'testuser', balance: 100, date:now, account_type: 'checking', interest: 0.01
    }

    test('Works with correct data obj', async function(){
        const res1 = await User.createAccount(accountObjCreate)
        const res2 = await User.createAccount(accountObjCreate2)
        const accountsRes = await User.getAccounts('testuser')
        const accountObjTransaction = {
            acc_receiving_id: accountsRes[0].id, 
            acc_sending_id: accountsRes[1].id, 
            amount: 500, 
            transaction_date: now
        }
        const res = await User.createTransaction(accountObjTransaction)
        expect(res).toEqual(
            [
                {
                    id: expect.any(Number),
                    acc_receiving_id: accountsRes[0].id, 
                    acc_sending_id: accountsRes[1].id, 
                    amount: 500, 
                    transaction_date: expect.any(Date)
                }
            ]
        )
    });
    test('Throws ExpressError if fails', async function(){
        try{
            const accountObjTransaction = {
                acc_receiving_id: -1, 
                acc_sending_id: -1, 
                amount: 500, 
                transaction_date: now
            }
            const res = await User.createTransaction(accountObjTransaction)
        }
        catch(e){
            expect(e instanceof ExpressError).toBeTruthy();
        }
    });
});

/**
 * User.updateBalances()
 */
describe('User.updateBalances()', function(){

    //if(acc_receiving_id != undefined && acc_sending_id == undefined)
    test('Works for Deposit', async function(){

        //SETUP
        const now = new Date();
        const accountObjCreate = {
            username: 'testuser', balance: 100, date:now, account_type: 'checking', interest: 0.01
        }
        const accountObjCreate2 = {
            username: 'testuser', balance: 100, date:now, account_type: 'checking', interest: 0.01
        }
        const res1 = await User.createAccount(accountObjCreate)
        const res2 = await User.createAccount(accountObjCreate2)
        const accountsRes = await User.getAccounts('testuser')
        const accountObjTransaction = {
            acc_receiving_id: accountsRes[0].id, 
            acc_sending_id: accountsRes[0].id, 
            amount: 500, 
            transaction_date: now
        }
        const transactionRes = await User.createTransaction(accountObjTransaction)
        const accountObj = {
            acc_receiving_id: accountsRes[0].id, 
            acc_sending_id: undefined, 
            amount: 500
        }

        //TEST     
        const res = await User.updateBalances(accountObj)   
        expect(res).toEqual(
            {
                returnObj: {
                    acc_receiving: {
                        acc_id: accountsRes[0].id,
                        amount_adjusted: 500,
                        acc_old_balance: 100,
                        updated_balance: 600
                    }
                }
            }
        )  
    });
    //if(acc_sending_id != undefined && acc_receiving_id == undefined)
    test('Works for Withdrawal', async function(){
        //SETUP
        const now = new Date();
        const accountObjCreate3 = {
            username: 'testuser', balance: 10000, date:now, account_type: 'checking', interest: 0.01
        }
        const res3 = await User.createAccount(accountObjCreate3)
        const accountsRes = await User.getAccounts('testuser')
        const accountObjTransaction = {
            acc_receiving_id: accountsRes[0].id, 
            acc_sending_id: accountsRes[0].id, 
            amount: 500, 
            transaction_date: now
        }
        const transactionRes = await User.createTransaction(accountObjTransaction)
        const accountObj = {
            acc_receiving_id: undefined, 
            acc_sending_id: accountsRes[0].id, 
            amount: 500
        }

        //TEST     
        const res5 = await User.updateBalances(accountObj)   
        expect(res5).toEqual(
            {
                returnObj: {
                    acc_sending: {
                        acc_id: accountsRes[0].id,
                        amount_adjusted: 500,
                        acc_old_balance: 10000,
                        updated_balance: 9500
                    }
                }
            }
        )  
    });
    //if(acc_sending_id != undefined && acc_receiving_id != undefined)
    test('Works for Transfer', async function(){
        //SETUP
        const now = new Date();
        const accountObjCreate4 = {
            username: 'testuser', balance: 10000, date:now, account_type: 'checking', interest: 0.01
        }
        const accountObjCreate5 = {
            username: 'testuser', balance: 3000, date:now, account_type: 'checking', interest: 0.01
        }
        const res6 = await User.createAccount(accountObjCreate4)
        const res7 = await User.createAccount(accountObjCreate5)
        const accountsRes = await User.getAccounts('testuser')
        const accountObjTransaction = {
            acc_receiving_id: accountsRes[0].id, 
            acc_sending_id: accountsRes[1].id, 
            amount: 3000, 
            transaction_date: now
        }
        const transactionRes = await User.createTransaction(accountObjTransaction)
        const accountObj = {
            acc_receiving_id: accountsRes[0].id, 
            acc_sending_id: accountsRes[1].id,  
            amount: 3000
        }

        //TEST
        const res8 = await User.updateBalances(accountObj)
        expect(res8).toEqual(
            {
                returnObj: 
                {
                    acc_sending: 
                    {
                        acc_id: accountsRes[1].id,
                        amount_adjusted: 3000,
                        acc_old_balance: 3000,
                        updated_balance: 0
                    },
                    acc_receiving: 
                    {
                        acc_id: accountsRes[0].id,
                        amount_adjusted: 3000,
                        acc_old_balance: 10000,
                        updated_balance: 13000
                    }
                }    
            }
        )
    });
    test('Rollback to savepoint works', async function(){
        //SETUP
        const now = new Date();
        const accountObjCreate1 = {
            username: 'testuser', balance: 500, date:now, account_type: 'checking', interest: 0.01
        }
        const accountObjCreate2 = {
            username: 'testuser', balance: 1000, date:now, account_type: 'checking', interest: 0.01
        }
        const res6 = await User.createAccount(accountObjCreate1)
        const res7 = await User.createAccount(accountObjCreate2)
        const accountsRes = await User.getAccounts('testuser')
        const accountObjTransaction = {
            acc_receiving_id: accountsRes[0].id, 
            acc_sending_id: accountsRes[1].id, 
            amount: 1000, 
            transaction_date: now
        }
        const transactionRes = await User.createTransaction(accountObjTransaction)
        const accountObj = {
            acc_receiving_id: accountsRes[0].id, 
            acc_sending_id: accountsRes[1].id,  
            amount: 1000,
            rollback_savepoint: 1
        }

        //TEST
        const res8 = await User.updateBalances(accountObj)
        const accountsResPost = await User.getAccounts('testuser')
        expect(accountsResPost).toEqual(accountsRes)
    });
});

