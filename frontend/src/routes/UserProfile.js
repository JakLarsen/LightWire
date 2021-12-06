


                    //REACT USER PROFILE PAGE



            //IMPORTS AND SETUP



import React, {useContext, useState} from 'react'
import UserContext from '../UserContext'
import '../css/UserProfile.css'
import { validateForm } from '../helpers/form'
import { useNavigate } from 'react-router-dom'



            //USERPROFILE COMPONENT



const UserProfile = ({updateUser, deleteUser}) => {

    const navigate = useNavigate()

    const {currentUserInfo} = useContext(UserContext)

    const INITIAL_FORMDATA = {
        username: currentUserInfo.username,
        first_name: currentUserInfo.first_name,
        last_name: currentUserInfo.last_name,
        email: currentUserInfo.email,
        phone: currentUserInfo.phone
    }
    const INITIAL_FORMERRORS = []
    const [formData, setFormData] = useState(INITIAL_FORMDATA)
    const [formErrors, setFormErrors] = useState(INITIAL_FORMERRORS)

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(data => ({ ...data, [name]: value }));
    }
    /**
     * HANDLE UPDATE USERPROFILE FORM SUBMIT
     * 
     *  - Calls updateUser() from App.js
     *  - Which then makes a call to our LightWireAPI
     *  - Which we use to make a request to our API on the backend
     *  - Which updates user details
     */
    const handleSubmit = async (e) =>{
        console.debug('UserProfile: handleSubmit()')
        e.preventDefault();

        //Validate - basic
        const formErrors = await validateForm(formData)
        if(formErrors != false){
            setFormErrors([formErrors])
        }
        else{
            let result = await updateUser(formData)
            // Check for form errors from API
            console.log(`Update result: `, result)
            if (result.success) {
                navigate("/accounts-home");
            } 
            else{
                setFormErrors(result.errors);
            }
        }
    }
    /**
     * HANDLE DELETE USERPROFILE FORM SUBMIT
     * 
     *  - Calls deleteUser() from App.js
     *  - Which then makes a call to our LightWireAPI
     *  - Which we use to make a request to our API on the backend
     *  - Which deletes our user from the DB
     *  - Then logs out
     */
    const handleDeleteUser = async (e) => {
        console.debug('UserProfile: deleteUser()')
        e.preventDefault();

        const formErrors = await validateForm(formData)
        if(formErrors != false){
            setFormErrors([formErrors])
        }
        else{
            let result = await deleteUser()
            if (result.success) {
                navigate("/logout");
            } 
            else{
                setFormErrors(result.errors);
            }
        }
    }



                    //RETURNING



    return (
        <div className="UserProfile">
            <div className="UserProfile-form-title">Edit your profile, {currentUserInfo.username}.</div>
             <form className="UserProfile-form">

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
                <button className="update-btn" onClick={handleSubmit}>Update</button>
                <button className="delete-btn" onClick={handleDeleteUser}>Delete Account</button>

            </form>
        </div>
    )
}



export default UserProfile