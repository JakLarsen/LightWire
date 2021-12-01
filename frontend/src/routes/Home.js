          
          
          
                    // REACT HOME COMPONENT



            // IMPORTS AND SETUP



import '../css/Home.css';  
import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom'
import UserContext from '../UserContext';
import LightWireAPI from '../LightWireAPI';


            // COMPONENT



const Home = () => {

    const {currentUser, currentUserInfo} = useContext(UserContext)

    console.log('LOGOUT CHECK currentUser, currentUserInfo, LightWireAPI.token:', 
        currentUser, currentUserInfo, LightWireAPI.token)

    return (
        <div className="Home">
            <div className="Home-title">Banking made easy, for everyone.</div>
            <div className="Home-card">
                <div className="Home-card-title">Welcome to LightWire.</div>
                <div className="Home-card-btn-wrap">
                    <NavLink exact to="/login" className="Home-card-btn">Log in</NavLink>
                    <NavLink exact to="/signup" className="Home-card-btn">Sign up</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Home


  