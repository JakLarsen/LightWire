                    
                    
                    
                    // USERS MODEL



            // IMPORTS AND SETUP



const db = require('../db')
const {UnauthorizedError, NotFoundError, ExpressError, BadRequestError} = require('../expressError')
const bcrypt = require('bcrypt')
const { BCRYPT_WORK_FACTOR } = require('../config');
const {sqlForPartialUpdate} = require('../helpers/sql')




class User{


    /**
     * Authenticate a username and password combination
     * 
     * Returns {
     *  username: 'USERNAME', 
     *  password: 'PASSWORD', 
     *  first_name: 'FIRST_NAME',
     *  last_name: 'LAST_NAME',
     *  email: 'EMAIL', 
     *  phone: 'PHONE',
     *  is_admin: true or false
     * }
     **/
    static async authenticate(username, password){

        const results = await db.query(
            `
            SELECT username, password, first_name, last_name, email, phone, is_admin
            FROM users
            WHERE username = $1`,
            [username]
        );
        const ourUser = results.rows[0]
        if (ourUser){
            const isValid = await bcrypt.compare(password, ourUser.password)
            if (isValid){
                delete ourUser.password;
                return ourUser
            }
        }
        throw new UnauthorizedError("Unauthorized: Invalid username/password")
    };

    /**
     * Registers a new user
     * 
     * Returns {username: 'USERNAME'}
     **/
    static async register({username, password, first_name, last_name, email, phone}){
        try{

            const duplicateCheck = await db.query(
                `SELECT username
                 FROM users
                 WHERE username = $1`,
              [username],
            )
            if (duplicateCheck.rows[0]) {
                throw new BadRequestError(`Duplicate username: ${username}`);
            }

            const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)

            const results = await db.query(
                `INSERT INTO users 
                    (
                        username, 
                        password, 
                        first_name, 
                        last_name, 
                        email, 
                        phone
                    )
                VALUES 
                    ($1, $2, $3, $4, $5, $6)
                RETURNING username`,
                [
                    username, 
                    hashedPassword, 
                    first_name, 
                    last_name, 
                    email, 
                    phone
                ]
            )
            const ourUser = results.rows[0]
            // console.log(ourUser)
            return ourUser
        }
        catch(e){
            throw new ExpressError('User.register Error')
        }
    };


    /**
     * Retrieves a list of all users 
     * 
     * Auth: admin
     * Returns [{username, first_name, last_name, email, phone}, ...]
     **/
    static async getAll(){
        try{
            const results = await db.query(
                `SELECT 
                    username, 
                    first_name, 
                    last_name, 
                    email, 
                    phone 
                FROM users
                ORDER BY username`
            );
            const users = results.rows
            return users
        }
        catch(e){
            throw new ExpressError('getAll() Error')
        }
    };

    /**
     * Retrieves a user by username 
     * 
     * Auth Same User OR admin
     * Returns [{username, first_name, last_name, email, phone}, ...]
     **/
    static async getByUsername(username){
        try{
            const results = await db.query(
                `SELECT 
                    username, 
                    first_name, 
                    last_name, 
                    email, 
                    phone 
                FROM users
                WHERE username = $1`,
                [username]
            );
            const user = results.rows[0]
            return user
        }
        catch(e){
            throw new ExpressError('getByUsername() Error')
        }
    };

    /**
     * Partial update of user
     * 
     * Auth Same User OR admin
     * Returns {username, first_name, last_name, email, phone}
     **/
    static async update(username, data) {
        try{
            if (data.password) {
                data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
            }
    
            const { setCols, values } = sqlForPartialUpdate(
                data,
                {
                firstName: "first_name",
                lastName: "last_name",
                isAdmin: "is_admin",
                });
            const usernameVarIdx = "$" + (values.length + 1);
        
            const querySql = `UPDATE users 
                            SET ${setCols} 
                            WHERE username = ${usernameVarIdx} 
                            RETURNING username,
                                        first_name,
                                        last_name,
                                        email,
                                        phone`;
            const result = await db.query(querySql, [...values, username]);
            const user = result.rows[0];
        
            if (!user) throw new NotFoundError(`No user: ${username} found.`);
        
            //we don't want password being displayed on other end
            delete user.password;
            return user;
        }
        catch(e){
            throw new ExpressError('update() Error')
        }
    };

    /**
     * Delete a user by username
     * 
     * Auth Same User OR admin
     * No Return, but success is validated by API function calling
     * Future: Add return here.
     **/
    static async delete(username){
        try{
            let result = await db.query(
            `DELETE
             FROM users
             WHERE username = $1
             RETURNING username`,
            [username],
            );
        
            const user = result.rows[0];
        
            if (!user) throw new NotFoundError(`No user: ${username}`);
        }
        catch(e){
            throw new ExpressError('delete() Error') 
        }
        
    };

    /**
     * Get all user accounts for a given username
     * 
     * Auth: Same user OR admin
     * Return {accounts: [{id: ID, balance: BALANCE, ...}, {}, {}]}
     */
    static async getAccounts(username){
        try{
            const results = await db.query(
                `SELECT 
                    id,
                    balance,
                    username,
                    open_date,
                    account_type,
                    interest
                FROM accounts
                WHERE username = $1`,
                [username]
            );
            const accounts = results.rows
            return accounts
        }
        catch(e){
            throw new ExpressError('getAccounts Error')
        }
    };

    /**
     * Create an account for a given user
     * 
     * Auth: Same user OR admin
     * Returns [
     * {
            id: ID,
            user_id: USER_ID,
            username: USERNAME,
            balance: BALANCE,
            open_date: DATE,
            account_type: ACCOUNT_TYPE,
            interest: INTEREST
        }
    ]
     */
    static async createAccount(accountObj){
        console.log('In createAccount()')
        const {username, balance, date, account_type, interest} = accountObj
        try{

            //Get the user (could also getByUsername())
            const userResults = await db.query(
                `SELECT 
                    id,
                    username
                FROM users
                WHERE username = $1`,
            [username]
            );

            const userID = userResults.rows[0].id

            //Create an account for that user
            const results = await db.query(
                `INSERT INTO accounts
                (
                    user_id,
                    username, 
                    balance, 
                    open_date, 
                    account_type, 
                    interest
                )
                VALUES 
                    ($1, $2, $3, $4, $5, $6)
                RETURNING id, user_id, username, balance, open_date, account_type, interest
                `,
                [userID, username, balance, date, account_type, interest]
            )
            // console.log('CREATE ACCOUNT RETURN', results.rows)
            return results.rows
        }

        catch(e){
            throw new ExpressError('createAccount Error')
        }
    };


    /**
     * Delete an account for a user
     * 
     * Auth: Same user OR admin
     * No Return
     */
    static async removeAccount(id){
        console.log('In removeAccount()')

        try{
            let results = await db.query(
                `DELETE 
                FROM accounts
                WHERE id = $1`,
                [id]
            )
        }
        catch(e){
            throw new ExpressError('removeAccount() Error')
        }
    };

    /**
     * Create a transaction on a user account or between two users
     * 
     * Auth: Logged-in
     * Returns [{acc_receiving_id: ACC_RECEIVING_ID, ...} ]
     */
    static async createTransaction(accountObj){
        console.log('In createTransaction()', accountObj)

        const {acc_receiving_id, acc_sending_id, amount, transaction_date} = accountObj

        try{
            let results = await db.query(

                `INSERT INTO transactions
                (
                    acc_receiving_id,
                    acc_sending_id,
                    amount,
                    transaction_date
                )
                VALUES 
                    ($1, $2, $3, $4)
                RETURNING id, acc_receiving_id, acc_sending_id, amount, transaction_date
                `,
                [acc_receiving_id, acc_sending_id, amount, transaction_date]
            )
            return results.rows
        }
        catch(e){
            throw new ExpressError('createTransaction() Error')
        }
    };

    // static delay = (ms) => new Promise(res => setTimeout(res, ms));

    /**
     * Update balances of one or two accounts based on transaction type
     * - Deposits and withdrawals handled by checking for missing object properties
     * - Transfers handled by doing a withdrawal and a deposit essentially
     * 
     * Auth: Logged-in
     * Returns: {
     *  returnObj: 
     *  {
     *      acc_receiving: 
     *          {
     *              acc_id: ACC_RECEIVING_ID
     *              amount_adjusted: amount,
                    acc_old_balance: currentBalance.balance,
                    updated_balance: updatedBalance
                }
     *      acc_sending:
     *          {
                    acc_id: ACC_SENDING_ID,
                    amount_adjusted: amount,
                    acc_old_balance: currentBalance.balance,
                    updated_balance: updatedBalance
                }
     *  }
     * }
     * Could just return an object of the receiving and sending objects
     */
    static async updateBalances(accountObj){
        console.log('In updateBalances()', accountObj)
        
        const {acc_receiving_id, acc_sending_id, amount} = accountObj
        let returnObj = {}
        try{
            //DEPOSIT
            if(acc_receiving_id != undefined && acc_sending_id == undefined){
                console.log('In updateBalances() DEPOSIT', accountObj)
                //GET CURRENT RECEIVING BALANCE
                const begin = await db.query(`BEGIN;`)
                const balanceResults = await db.query(
                    `SELECT 
                        balance
                    FROM accounts
                    WHERE id = $1`,
                    [acc_receiving_id]
                );
                // const savePoint = await db.query(`SAVEPOINT my_savepoint;`)
                const currentBalance = balanceResults.rows[0]
                const updatedBalance = parseFloat(amount) + parseFloat(currentBalance.balance)

                let results = await db.query(
                    `UPDATE accounts
                    SET balance = $1
                    WHERE id = $2
                    RETURNING id, balance`,
                    [updatedBalance, acc_receiving_id]
                )
                // const rollBackTest = await db.query(`ROLLBACK TO my_savepoint;`)
                const commit = await db.query(`COMMIT;`)
                // if (rollBackTest){
                //     returnObj.rolledBack = rollBackTest
                // }
                // else{
                //     returnObj.rolledBack = 'No Rollback'
                // }
                returnObj.acc_receiving = {
                    acc_id: acc_receiving_id,
                    amount_adjusted: amount,
                    acc_old_balance: currentBalance.balance,
                    updated_balance: updatedBalance
                }
                console.log('RETURN OBJECT DEPOSIT: ', returnObj)
            }

            //WITHDRAWAL
            else if(acc_sending_id != undefined && acc_receiving_id == undefined){
                console.log('In updateBalances() WITHDRAWAL', accountObj)
                //GET CURRENT SENDING BALANCE
                const balanceResults = await db.query(
                    `SELECT 
                        balance
                    FROM accounts
                    WHERE id = $1`,
                    [acc_sending_id]
                );
                const currentBalance = balanceResults.rows[0]
                const updatedBalance = parseFloat(currentBalance.balance) - parseFloat(amount)
                console.log('Updated balance sending ', updatedBalance)
                
                let results = await db.query(
                    `UPDATE accounts
                    SET balance = $1
                    WHERE id = $2
                    RETURNING id, balance
                    `,[updatedBalance, acc_sending_id]
                )
                
                returnObj.acc_sending = {
                    acc_id: acc_sending_id,
                    amount_adjusted: amount,
                    acc_old_balance: currentBalance.balance,
                    updated_balance: updatedBalance
                }
            }
            //TRANSFER
            else if(acc_sending_id != undefined && acc_receiving_id != undefined){
                console.log('In updateBalances() TRANSFER', accountObj)

                //GET CURRENT RECEIVING BALANCE
                const begin = await db.query(`BEGIN;`)
                const savePointFirst = await db.query(`SAVEPOINT my_savepoint;`)
                const balanceResults = await db.query(
                    `SELECT 
                        balance
                    FROM accounts
                    WHERE id = $1`,
                    [acc_receiving_id]
                );
                const currentBalance = balanceResults.rows[0]
                const updatedBalance = parseFloat(amount) + parseFloat(currentBalance.balance)

                let results = await db.query(
                    `UPDATE accounts
                    SET balance = $1
                    WHERE id = $2
                    RETURNING id, balance
                    `,[updatedBalance, acc_receiving_id]
                )
                const savePointSecond = await db.query(`SAVEPOINT my_second_savepoint;`)
                returnObj.acc_receiving = {
                    acc_id: acc_receiving_id,
                    amount_adjusted: amount,
                    acc_old_balance: currentBalance.balance,
                    updated_balance: updatedBalance
                }

                //GET CURRENT SENDING BALANCE
                const balanceResults_sending = await db.query(
                    `SELECT 
                        balance
                    FROM accounts
                    WHERE id = $1`,
                    [acc_sending_id]
                );
                const currentBalance_sending = balanceResults_sending.rows[0]
                const updatedBalance_sending = parseFloat(currentBalance_sending.balance) - parseFloat(amount)
                console.log('Updated balance sending ', updatedBalance_sending)
                
                let results_sending = await db.query(
                    `UPDATE accounts
                    SET balance = $1
                    WHERE id = $2
                    RETURNING id, balance
                    `,[updatedBalance_sending, acc_sending_id]
                )

                //FOR TESTING
                // accountObj.rollback_savepoint = 1
                //This rollsback entire transaction
                if (accountObj.rollback_savepoint == 1){
                    const rollBackTest = await db.query(`ROLLBACK TO my_savepoint;`)
                }
                //This rollsback to after the deposit into the receiving acc but before withdrawal from the sending
                else if (accountObj.rollback_savepoint == 2){
                    const rollBackTest = await db.query(`ROLLBACK TO my_second_savepoint;`)
                }

                const commit = await db.query(`COMMIT;`)
                returnObj.acc_sending = {
                    acc_id: acc_sending_id,
                    amount_adjusted: amount,
                    acc_old_balance: currentBalance_sending.balance,
                    updated_balance: updatedBalance_sending
                }
                console.log('RETURNOBJ TRANSFER: ', returnObj)
            }

            return {returnObj}
        }
        catch(e){
            console.log('TRANSACTION INTERRUPTED')
            const rollBackTest = await db.query(`ROLLBACK TO my_savepoint;`)

            throw new ExpressError(e.stack)
        }
    };


}



module.exports = {User}