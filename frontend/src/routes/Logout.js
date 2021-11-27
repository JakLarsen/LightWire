import React, {useContext} from "react";
import UserContext from '../UserContext';
import {useNavigate} from 'react-router-dom'


const Logout = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext);
    setCurrentUser(undefined)
    // let navigate = useNavigate('/');


    return (
        <div className="Logout">
            <h1>Logged Out</h1>
        </div>
    )
}

export default Logout