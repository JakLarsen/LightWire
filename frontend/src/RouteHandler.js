          
          
          
          // REACT ROUTE HANDLER COMPONENT



      // IMPORTS AND SETUP



import React from 'react'
import {Route, Routes} from 'react-router-dom'

import Signup from "./routes/Signup";



      // COMPONENT


  
const RouteHandler = () => {

    return (
       <div className="RouteHandler">
            <Routes>
                
                <Route exact path="/signup" element={<Signup/>}/>

            </Routes>
       </div> 
    )
}

export default RouteHandler