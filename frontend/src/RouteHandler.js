          
          
          
          // REACT ROUTEHANDLER COMPONENT



      // IMPORTS AND SETUP



import React, {useContext} from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom'
import LightWireAPI from './LightWireAPI'
import UserContext from './UserContext'

import Home from './routes/Home'
import AccountsHome from './routes/AccountsHome'
import Signup from "./routes/Signup";
import Login from './routes/Login';
import Logout from './routes/Logout';
import PrivateRoute from './PrivateRoute'
import UserProfile from './routes/UserProfile';
import NotFound from './routes/NotFound'
import AddAccount from './routes/AddAccount'



      // COMPONENT


  
const RouteHandler = ({login, signup, updateUser, deleteUser, createAccount, deleteAccount}) => {

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
                    exact path="/accounts-home" 
                    element={
                        <PrivateRoute>
                            <AccountsHome deleteAccount={deleteAccount}/>
                        </PrivateRoute>
                    }
                />
                <Route 
                    exact path="/users/:username"
                    element={
                        <PrivateRoute>
                            <UserProfile updateUser={updateUser} deleteUser={deleteUser}/>
                        </PrivateRoute>
                    }
                />
                <Route
                    exact path="/users/:username/create-account"
                    element={
                        <PrivateRoute>
                            <AddAccount createAccount={createAccount}/>
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