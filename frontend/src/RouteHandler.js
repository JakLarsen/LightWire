          
          
          
          // REACT ROUTEHANDLER COMPONENT



      // IMPORTS AND SETUP



import React from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom'

import Home from './routes/Home'
import ProfileHome from './routes/ProfileHome'
import Signup from "./routes/Signup";
import Login from './routes/Login';
import Logout from './routes/Logout';
import PrivateRoute from './PrivateRoute'
import UserProfile from './routes/UserProfile';
import NotFound from './routes/NotFound'



      // COMPONENT


  
const RouteHandler = ({login, signup}) => {


    let navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }

    return (
       <div className="RouteHandler">
            <Routes>
                
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/signup" element={<Signup signup={signup}/>}/>
                <Route exact path="/login" element={<Login login={login}/>}/>
                <Route exact path="/logout" element={<Logout/>}/>

                <Route 
                    exact path="/profile-home" 
                    element={
                        <PrivateRoute>
                            <ProfileHome/>
                        </PrivateRoute>
                    }
                />
                <Route 
                    exact path="/profiles/:username"
                    element={
                        <PrivateRoute>
                            <UserProfile/>
                        </PrivateRoute>
                    }
                />

                {/* 404 CATCH */}
                <Route path="*" element={<NotFound goBack={goBack}/>}/>
            </Routes>
       </div> 
    )
}

export default RouteHandler