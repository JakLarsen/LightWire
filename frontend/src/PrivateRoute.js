          
          
          
          // REACT PRIVATE ROUTE COMPONENT



      // IMPORTS AND SETUP



import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "./UserContext";



      // PRIVATE ROUTE COMPONENT


      
//Returns child components if a currentUser exists (IS LOGGED IN)
function PrivateRoute({ children }) {
  const { currentUser } = useContext(UserContext);
  console.log('in PrivateRoute, Current User:', currentUser)

  return currentUser ? children : <Navigate to="/login"/>
}



export default PrivateRoute;
