          
          
          
          // REACT MAIN APP COMPONENT



      // IMPORTS AND SETUP



import './css/App.css';

import React, {useState, useEffect} from 'react';
import { BrowserRouter } from "react-router-dom";
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

  const [currentUser, setCurrentUser] = useState(INITIAL_USER)
  const [token, setToken] = useState(INITIAL_TOKEN)
  const [currentUserInfo, setCurrentUserInfo] = useState(INITIAL_USER_INFO)
  const [errors, setErrors] = useState(INITIAL_ERRORS)

  //LOGIN AND SIGNUP FUNCTIONALITY

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
      console.log('res2 data from getUserData attempt: ', res2)
      return ({success: true})
    }  
  }

  const signup = async (data) => {
    // console.debug('App.js: signup()')

    // Request API to access post: auth/register
    let res = await LightWireAPI.signup(data)
    const token = res._token
    if (!token){
      setErrors(['Invalid Form Data'])
      return ({errors: 'Invalid Form Data', success: false})
    } 
    else{
      setCurrentUser({username: res.registered, _token: token})
      return ({success: true})
    }  
  }



  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={
          {
            currentUser, setCurrentUser, 
            currentUserInfo, setCurrentUserInfo
          }}>
          <Navbar/>
          <RouteHandler login={login} signup={signup}/>
        </UserContext.Provider>
      </BrowserRouter>  
    </div>
  );
}

export default App;
