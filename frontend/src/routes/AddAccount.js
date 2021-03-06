


                    //REACT ADD ACCOUNT



            //IMPORTS AND SETUP



import React, {useState, useContext} from 'react'
import UserContext from '../UserContext'
import '../css/AddAccount.css'
import {getDate} from '../helpers/date'
import { getInterestRate, validateForm } from '../helpers/form'
import { useNavigate } from 'react-router'



            //ADD ACCOUNT COMPONENT



const AddAccount = ({createAccount}) => {

    let navigate = useNavigate()

    const {currentUser} = useContext(UserContext)

    const INITIAL_FORMDATA = {
        username: currentUser.username,
        balance: 0.001,
        account_type: "Savings",
        open_date: getDate(),
        interest: 0.02

    }
    const INITIAL_FORMERRORS = []
    const [formData, setFormData] = useState(INITIAL_FORMDATA)
    const [formErrors, setFormErrors] = useState(INITIAL_FORMERRORS)

    const handleChange = (e) => {
        const {name, value} = e.target
        const interest = getInterestRate(value)
        setFormData(data => ({ ...data, [name]: value, interest: interest }));
    }
    /**
     * HANDLE ADD ACCOUNT FORM SUBMIT
     * 
     *  - Calls createAccount() from App.js
     *  - Which then makes a call to our LightWireAPI
     *  - Which we use to make a request to our API on the backend
     *  - Which adds a new account to the DB
     */
    const handleSubmit = async (e) => {
        console.debug('AddAccount: handleSubmit()')
        e.preventDefault()

        //Basic Validation
        const formErrors = await validateForm(formData)
        if(formErrors != false){
            setFormErrors([formErrors])
        }
        else{
            let result = await createAccount(formData)
            //Check for form errors from API
            console.log(`Add account result: `, result)
            if (result.success) {
                navigate("/accounts-home");
            } 
            else{
                setFormErrors(result.errors);
            }
        }
    }



                //RETURNING



    return (

        <div className="AddAccount">
            <div className="AddAccount-title">Create a new account.</div>

            <form className="AddAccount-form" onSubmit={handleSubmit} >

                <label className="form-label" htmlFor="account_type">Account Type: </label>
                <select className="form-input" name="account_type" onChange={handleChange}>
                    <option value="savings">Savings</option>
                    <option value="checking">Checking</option>
                    <option value="credit">Credit</option>
                </select>
                <div className="form-errors">{formErrors}</div>
                <button className="AddAccount-btn" onClick={handleSubmit}>Add Account</button>

            </form>

        </div>
    )
}

export default AddAccount