import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "./UserContext";

function PrivateRoute({ children }) {
  const { currentUser } = useContext(UserContext);
  console.log('in PrivateRoute, Current User:', currentUser)

  return currentUser ? children : <Navigate to="/login"/>

  
}

export default PrivateRoute;
