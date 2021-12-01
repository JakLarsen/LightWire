                    
                    
                    
                    // FORM HELPERS


/**
 * Validate forms
 *  - All fields not empty or falsy
 *  - All fields >= 2 chars long
 **/
const validateForm = async (formData) => {
    console.debug('validateForm()')

    let formErrors = false

    Object.values(formData).forEach((dataField)=>{
        if (!dataField){
            formErrors = "Please fill out all fields."
        }
        else if(dataField.length < 2){
            formErrors = "Fields should be at least 2 characters long."
        }
    })

    return formErrors
}

const getInterestRate = (account_type) => {
    let interestRate = 0
    if (account_type=='savings') interestRate = 0.02
    else if (account_type=='checking') interestRate = 0.01
    else if (account_type=='credit') interestRate = 0.02
    return interestRate
}



module.exports = {validateForm, getInterestRate}