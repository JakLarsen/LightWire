import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/Account.css'
import UserContext from '../UserContext'




const Account = ({balance, type, id, interest, deleteAccount}) => {

    let navigate = useNavigate()

    const {currentUser} = useContext(UserContext)

    const handleDeleteClick = async (e) => {
        console.debug('Account: handleDeleteClick()')
        e.preventDefault()

        let dataObj = {
            username: currentUser.username,
            id: id
        }
         // in App.js, deleteAccount()
         let result = await deleteAccount(dataObj)
         //Check for form errors from API
         console.log(`Delete Account result: `, result)
         if (result.success) {
             navigate("/accounts-home");
         } 
         else{
             console.log('Something went wrong')
         }
    }




    return (
        <div className="account">
            <div className="account-title">{type.toUpperCase()} ACC: x000{id}</div>
            <div className="account-balance"><span className="strong">BALANCE:</span> ${balance}</div>
            <div className="account-interest"><span className="strong">INTEREST:</span> {interest * 100}.00%</div>
        
            {type != "credit" ? 
                <div className="account-interest"><span className="strong">(YR) INTEREST EST:</span> ${(balance*interest).toFixed(2)}</div>
                :
                <div className="account-interest"><span className="strong">(MO) INTEREST EST:</span> -${(balance*interest).toFixed(2)}</div>
            }
            <div className="account-btn-wrap">
                <div className="account-transactions-btn">Statements</div>
                <div className="account-delete-btn" onClick={handleDeleteClick}>X</div>
            </div>
            
        </div>
    )
}

export default Account