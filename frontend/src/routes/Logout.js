import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import LightWireAPI from "../LightWireAPI";



const Logout = () => {

    let navigate = useNavigate()

    const {setCurrentUser, setCurrentUserInfo} = useContext(UserContext)

     //LOGOUT

     const logout = () => {
        setCurrentUser(undefined)
        setCurrentUserInfo(undefined)
        LightWireAPI.token = "";
        navigate('/')
    }
    logout()

    return (
        <div className="Logout">
            <h1>Logged Out</h1>
        </div>
    )
}

export default Logout