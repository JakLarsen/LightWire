          
          
          
          // REACT MAIN APP COMPONENT



      // IMPORTS AND SETUP



import './css/App.css';

import React, {useState, useEffect} from 'react';
import { BrowserRouter} from "react-router-dom";
import UserContext from './UserContext';

import LightWireAPI from './LightWireAPI';
import RouteHandler from './RouteHandler';
import Navbar from './Navbar';



      // MAIN APP


      
function App() {



        //STATE MANAGEMENT



  const INITIAL_USER = undefined 
  const INITIAL_USER_INFO = undefined
  const INITIAL_TOKEN = undefined
  const INITIAL_ERRORS = []
  const INITIAL_ACCOUNTS = []

  const [currentUser, setCurrentUser] = useState(INITIAL_USER)
  const [token, setToken] = useState(INITIAL_TOKEN)
  const [currentUserInfo, setCurrentUserInfo] = useState(INITIAL_USER_INFO)
  const [errors, setErrors] = useState(INITIAL_ERRORS)
  const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS)



        //LOGIN 

  /**
   * Logs a user in
   * 
   * - Calls our API to POST a login request to the backend model
   * - Authenticates that a token was received if successful
   * - Retrieves the user data from API and sets it in State
   * 
   * Returns {success: true} or {success: false, errors: 'Invalid Username or Password'}
   */
  const login = async (data) => {
    console.debug('App.js: login(), data: ', data)
    
    // Request API to access post: auth/login
    let res = await LightWireAPI.login(data)
    console.log('Logging in, data we retrieved res: ', res)
    const token = res._token

    if (!token){
      setErrors(['Invalid Username or Password'])
      return ({errors: 'Invalid Username or Password', success: false})
    } 

    else{
      setToken(token)
      LightWireAPI.token = token
      setCurrentUser(
        {
          username: res.currentUser,
          _token: token
        }
      )
      let res2 = await LightWireAPI.getUserData({
        username: res.currentUser,
        _token: token
      })
      const ourUserInfo = res2.user
      await setCurrentUserInfo(ourUserInfo)
      console.log('RESULTS FROM RES2: ', res2, currentUserInfo)
      return ({success: true})
    }  
  }



        //SIGN UP

  /**
   * Sign up a user (add a user row to the database)
   * 
   * - Calls our API to POST a register request to the backend model
   * - Authenticates that a token was received if successful
   * - Retrieves the user data from API and sets it in State
   * 
   * Returns {success: true} or {success: false, errors: 'Invalid Form Data'}
   */
  const signup = async (data) => {
    console.debug('App.js: signup()')

    // Request API to access post: auth/register
    let res = await LightWireAPI.signup(data)
    const token = res._token
    if (!token){
      setErrors(['Invalid Form Data'])
      return ({errors: 'Invalid Form Data', success: false})
    } 
    else{
      setToken(token)
      LightWireAPI.token = token
      setCurrentUser(
        {
          username: res.registered,
          _token: token
        }
      )
      let res2 = await LightWireAPI.getUserData({
        username: res.registered,
        _token: token
      })
      console.log(token)
      const ourUserInfo = res2.user
      await setCurrentUserInfo(ourUserInfo)
      console.log('RESULTS FROM RES2: ', res2, currentUserInfo)
      return ({success: true})
    }  
  }


  
        //UPDATE USER

  /**
   * Updates a user row in the database
   * 
   * - Calls our API to UPDATE a user table request to the backend model
   * - Authenticates that a valid token is on the API
   * - Updates user data from API and sets it in State
   * 
   * Returns {success: true} or {success: false, errors: 'Missing Token'}
   */
  const updateUser = async (data) => {
    console.debug('App.js: updateUser()')

    const username = currentUserInfo.username
    const token = LightWireAPI.token
    if (!token){
      setErrors(['Missing Token'])
      return ({errors: 'Missing Token', success: false})
    } 
    else{
      let res = await LightWireAPI.updateUser(data)
      console.log('UPDATE USER res: ', res)
      await setCurrentUserInfo(
        {
          username: currentUserInfo.username,
          first_name: res.user.first_name,
          last_name: res.user.last_name,
          email: res.user.email,
          phone: res.user.phone
        }
      )
      console.log('RESULTS FROM RES2: ', res, currentUserInfo)
      return ({success: true})
    }
  }



        //DELETE USER

  /**
   * Deletes a user from the database
   * 
   * - Calls our API to DELETE a user table request on the backend model
   * - Authenticates that a valid token is on the API
   * - Deletes user
   * 
   * Returns {success: true} or {success: false, errors: 'Missing Token'}
   */
  const deleteUser = async () => {
    console.debug('App.js: deleteUser()')

    const username = currentUserInfo.username
    let data = {username: username}
    const token = LightWireAPI.token
    if (!token){
      setErrors(['Missing Token'])
      return ({errors: 'Missing Token', success: false})
    } 
    else{
      let res = await LightWireAPI.deleteUser(data)
      return ({success: true})
    }

  }



        // CREATE ACCOUNT

  /**
   *  Create a new account associated with a user in the database
   * 
   * - Calls our API to POST an account table request on the backend model
   * - Authenticates that a valid token is on the API
   * 
   * Returns {success: true} or {success: false, errors: 'Missing Token'}
   */
  const createAccount = async (data) => {
    console.debug('App.js: createAccount()', data)

    const token = LightWireAPI.token
    if(!token){
      setErrors(['Missing Token'])
      return({errors: 'Missing Token', success: false})
    }
    else{
      let res = await LightWireAPI.createAccount(data)
      return ({success: true})
    }

  }



        //DELETE ACCOUNT

  /**
   *  Delete an account for a user from the database
   * 
   * - Calls our API to DELETE an account table request on the backend model
   * - Authenticates that a valid token is on the API
   * 
   * Returns {success: true} or {success: false, errors: 'Missing Token'}
   */
  const deleteAccount =  async(data) => {
    console.debug('App.js: deleteAccount()', data)

    const token = LightWireAPI.token
    if(!token){
      setErrors(['Missing Token'])
      return({errors: 'Missing Token', success: false})
    }
    else{
      let res = await LightWireAPI.deleteAccount(data)
      let newAccounts = []
      accounts.forEach(account => {
        if (account.id != data.id){
          newAccounts.push(account)
        }
      })
      setAccounts(newAccounts)
      return ({success: true})
    }
  }



        // UPDATE BALANCE (DEPOSIT, WITHDRAWL, TRANSFER)

  /**
   *  Update an account balance for a given user account
   * 
   * - Calls our API to POST a transactions on the backend model
   * - Then our API calls to partial UPDATE an account's (or two if transfer) balance column(s)
   * - Authenticates that a valid token is on the API
   * 
   * Returns {success: true} or {success: false, errors: 'Missing Token'}
   */
  const updateBalance = async(data) => {
    console.debug('App.js: updateBalance()', data)

    const token = LightWireAPI.token
    if(!token){
      setErrors(['Missing Token'])
      return({errors: 'Missing Token', success: false})
    }
    else{
      console.log('Ready to update balance from API')
      let res = await LightWireAPI.updateBalance(data, currentUser.username)
      return ({success: true})
    }
  }



        // RETURNING MAIN APP



  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={
          {
            currentUser, setCurrentUser, 
            currentUserInfo, setCurrentUserInfo,
            accounts, setAccounts
          }}>
          <Navbar/>
          <RouteHandler 
            login={login} 
            signup={signup} 
            updateUser={updateUser}
            deleteUser={deleteUser}
            createAccount={createAccount}
            deleteAccount={deleteAccount}
            updateBalance={updateBalance}
          />
        </UserContext.Provider>
      </BrowserRouter>  
    </div>
  );
}



export default App;
