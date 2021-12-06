


                    //REACT LOGOUT



            //IMPORTS AND SETUP



import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import LightWireAPI from "../LightWireAPI";



            //LOGOUT COMPONENT



const Logout = () => {

    let navigate = useNavigate()

    const {setCurrentUser, setCurrentUserInfo} = useContext(UserContext)

    //Take the currentUser and token out of State and logout.
    //Probably can use useEffect here
    const logout = () => {
        setCurrentUser(undefined)
        setCurrentUserInfo(undefined)
        LightWireAPI.token = "";
        navigate('/')
    }
    logout()



                //RETURNING



    return (
        <div className="Logout">
            <h1>Logged Out</h1>
        </div>
    )
}



export default Logout