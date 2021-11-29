          
          
          
                    // REACT HOME COMPONENT



            // IMPORTS AND SETUP



import '../css/Home.css';  
import React from 'react';
import {NavLink} from 'react-router-dom'



            // COMPONENT



const Home = () => {


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


  