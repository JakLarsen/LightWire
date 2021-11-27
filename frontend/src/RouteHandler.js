          
          
          
          // REACT ROUTE HANDLER COMPONENT



      // IMPORTS AND SETUP



import React from 'react'
import {Route, Routes} from 'react-router-dom'

import Signup from "./routes/Signup";
import Login from './routes/Login';
import Logout from './routes/Logout';



      // COMPONENT


  
const RouteHandler = ({login}) => {

    return (
       <div className="RouteHandler">
            <Routes>
                
                <Route exact path="/signup" element={<Signup/>}/>
                <Route exact path="/login" element={<Login login={login}/>}/>
                <Route exact path="/logout" element={<Logout/>}/>

            </Routes>
       </div> 
    )
}

export default RouteHandler