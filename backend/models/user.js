                    
                    
                    
                    // USERS MODEL



            // IMPORTS AND SETUP



const db = require('../db')
const {UnauthorizedError, NotFoundError, ExpressError} = require('../expressError')
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
    }

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
                throw new ExpressError(`Duplicate username: ${username}`);
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
                    phone]
            )
            const ourUser = results.rows[0]
            console.log(ourUser)
            return ourUser
        }
        catch(e){
            throw new ExpressError('User.register Error')
        }
    }


    /**
     * Retrieves a list of all users (if admin)
     * 
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
    }

    /**
     * Retrieves a user by username (if same user or admin)
     * 
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
    }

    /**
     * Partial update of user (if same user or admin)
     * 
     * Returns [{username, first_name, last_name, email, phone}, ...]
     **/
    static async update(username, data) {
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

    /**
     * Delete a user by username (if same user or admin)
     * 
     * Returns [{username, first_name, last_name, email, phone}, ...]
     **/
    static async delete(username){
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
    }

    static async createAccount(accountObj){
        console.log('In createAccount()')
        const {username, balance, date, account_type, interest} = accountObj
        try{
            const userResults = await db.query(
                `SELECT 
                    id,
                    username
                FROM users
                WHERE username = $1`,
            [username]
            );

            const userID = userResults.rows[0].id

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
            return results.rows
        }

        catch(e){
            throw new ExpressError('createAccount Error')
        }
    }


}



module.exports = {User}