          
          
          
          // REACT NAVBAR COMPONENT



      // IMPORTS AND SETUP



import './css/Navbar.css';  
import React, {useContext} from 'react';
import UserContext from "./UserContext";
import {NavLink} from 'react-router-dom';

import ProfileHome from './routes/ProfileHome'



      // COMPONENT


  
const Navbar = () => {

    const { currentUser } = useContext(UserContext);

    function loggedOut(){
        return (
            <div className="Navbar-logged-out">
                <div className="Navbar-left">
                    <NavLink exact to="/" className="Navbar-brand nav-items">
                        LightWire
                    </NavLink>
                </div>
                <div className="Navbar-right">
                    <NavLink exact to="/login" className="nav-items">
                        Login
                    </NavLink>
                    <NavLink exact to="/signup" className="nav-items">
                        Sign Up
                    </NavLink>
                </div>
            </div> 
        )
    }

    function loggedIn(){
        return (
            <div className="Navbar-logged-in">
                <div className="Navbar-left">
                    <h1>Welcome back, {currentUser.username}</h1>
                </div>
                <div className="Navbar-right">
                    <NavLink exact to="/logout" className="nav-items">
                        Log Out
                    </NavLink>
                </div>
            </div>
        )
    }
    
    return (
        <div className="NavBar">
            {currentUser ? loggedIn() : loggedOut()}
        </div>
    )
}

export default Navbar