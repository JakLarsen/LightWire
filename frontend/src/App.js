          
          
          
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



  // MAIN APP



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
          />
        </UserContext.Provider>
      </BrowserRouter>  
    </div>
  );
}

export default App;
