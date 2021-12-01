          
          
          
          // REACT SIGNUP FORM COMPONENT



      // IMPORTS AND SETUP



import '../css/Signup.css';  
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { validateForm } from '../helpers/form';



      // COMPONENT


  
const Signup = ({signup}) => {

    let navigate = useNavigate();

    const INITIAL_FORMDATA = {
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: ""
    }
    const INITIAL_FORMERRORS = []
    const [formData, setFormData] = useState(INITIAL_FORMDATA)
    const [formErrors, setFormErrors] = useState(INITIAL_FORMERRORS)

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(data => ({ ...data, [name]: value }));
    }

    const handleSubmit = async (e) =>{
        console.debug('Signup: handleSubmit()')
        e.preventDefault();

        //Gather form data
        console.log(formData)
        //Validate - basic
        const formErrors = await validateForm(formData)
        if(formErrors != false){
            setFormErrors([formErrors])
        }
        else{
             //Signup from App.js
            let result = await signup(formData)
            //Check for form errors from API
            console.log(`Signup result: `, result)
            if (result.success) {
                navigate("/accounts-home");
            } 
            else{
                setFormErrors(result.errors);
            }
        }
    }


    
    return(
        <div className="Signup">
            <div className="Signup-title">Sign Up</div>

            <form className="Signup-form" onSubmit={handleSubmit}>

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
                <label className="form-label" htmlFor="first_name">First Name: </label>
                <input className="form-input" 
                    type="text" placeholder="What is your first name"
                    name="first_name" value={formData.first_name}
                    onChange={handleChange}
                />
                <label className="form-label" htmlFor="last_name">Last Name: </label>
                <input className="form-input" 
                    type="text" placeholder="What is your last name"
                    name="last_name" value={formData.last_name}
                    onChange={handleChange}
                />
                <label className="form-label" htmlFor="email">Email: </label>
                <input className="form-input" 
                    type="text" placeholder="Please enter an email"
                    name="email" value={formData.email}
                    onChange={handleChange}
                />              
                <label className="form-label" htmlFor="phone">Phone: </label>
                <input className="form-input" 
                    type="text" placeholder="And a number to reach you"
                    name="phone" value={formData.phone}
                    onChange={handleChange}
                />
                <div className="form-errors">{formErrors}</div>
                <button className="Signup-btn" onClick={handleSubmit}>Sign Up</button>

            </form>

        </div>
    )
}

export default Signup