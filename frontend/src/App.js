          
          
          
          // REACT MAIN APP COMPONENT



      // IMPORTS AND SETUP



import './css/App.css';

import React, {useState} from 'react';
import { BrowserRouter } from "react-router-dom";
import UserContext from './UserContext';

import LightWireAPI from './LightWireAPI';
import RouteHandler from './RouteHandler';
import Navbar from './Navbar';



      // MAIN APP


      
function App() {

  const INITIAL_USER = undefined 
  const INITIAL_ERRORS = []
  const [currentUser, setCurrentUser] = useState(INITIAL_USER)
  const [errors, setErrors] = useState(INITIAL_ERRORS)

  const login = async (data) => {
    console.debug('App.js: login()')
    console.log(`App.js Login data: `, data)
    let res = await LightWireAPI.login(data)
    const token = res._token
    if (!token){
      setErrors(['Invalid Username or Password'])
      return ({errors: 'Invalid Username or Password', success: false})
    } 
    else{
      setCurrentUser({username: res.currentUser})
      return ({success: true})
    } 
    
  }

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
          <Navbar/>
          <RouteHandler login={login}/>
        </UserContext.Provider>
      </BrowserRouter>  
    </div>
  );
}

export default App;
