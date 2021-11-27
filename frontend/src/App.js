          
          
          
          // REACT MAIN APP COMPONENT



      // IMPORTS AND SETUP



import './css/App.css';

import React, {useState} from 'react'
import { BrowserRouter } from "react-router-dom";
import UserContext from './UserContext'

import RouteHandler from './RouteHandler';
import Navbar from './Navbar'



      // MAIN APP


      
function App() {

  const INITIALUSER = undefined //{username: 'JakeUser'}
  const [currentUser, setCurrentUser] = useState(INITIALUSER)

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
          <Navbar/>
          <RouteHandler/>
        </UserContext.Provider>
      </BrowserRouter>  
    </div>
  );
}

export default App;
