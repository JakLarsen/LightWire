          
          
          
                    // REACT LOGIN FORM COMPONENT



            // IMPORTS AND SETUP



import '../css/Login.css';  
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import { validateForm } from '../helpers/form';



            // LOGINCOMPONENT


  
const Login = ({login}) => {

    let navigate = useNavigate();

    const INITIAL_FORMDATA = {
        username: "",
        password: "",
    }
    const [formData, setFormData] = useState(INITIAL_FORMDATA)
    const [formErrors, setFormErrors] = useState([]);

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(data => ({ ...data, [name]: value }));
    }
    /**
     * HANDLE LOGIN FORM SUBMIT
     * 
     *  - Calls login() from App.js
     *  - Which then makes a call to our LightWireAPI
     *  - Which we use to make a request to our API on the backend
     *  - To handle authentication and login
     */
    const handleSubmit = async (e) =>{
        console.debug('Login: handleSubmit()')

        e.preventDefault();
        const formErrors = await validateForm(formData)
        if(formErrors != false){
            setFormErrors([formErrors])
        }
        else{
            let result = await login(formData)
            console.log(`Login result: `, result)
            if (result.success) {
                navigate("/accounts-home");
            } 
            else{
                setFormErrors(result.errors);
            }
        }
    }



                //RETURNING



    return(
        <div className="Login">
            <div className="Login-title">Log In</div>

            <form className="Login-form" onSubmit={handleSubmit}>

                <label className="form-label" htmlFor="username">Username: </label>
                <input className="form-input" 
                    type="text" placeholder="Enter a username"
                    name="username" value={formData.username}
                    onChange={handleChange}
                />
                <label className="form-label" htmlFor="password">Password: </label>
                <input className="form-input" 
                    type="password" placeholder="Create a new password"
                    name="password" value={formData.password}
                    onChange={handleChange}
                />
                <div className="form-errors">{formErrors}</div>
                <button className="Login-btn" onClick={handleSubmit}>Log In</button>

            </form>

        </div>
    )
}



export default Login