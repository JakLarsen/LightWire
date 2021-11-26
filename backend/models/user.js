                    
                    
                    
                    // USERS MODEL



            // IMPORTS AND SETUP



const db = require('../db')
const {UnauthorizedError} = require('../expressError')
const bcrypt = require('bcrypt')
const { BCRYPT_WORK_FACTOR } = require('../config');




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
     * Retrieves a list of all users
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



}



module.exports = {User}