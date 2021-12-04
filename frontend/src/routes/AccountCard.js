import React, {useContext} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../css/AccountCard.css'
import UserContext from '../UserContext'




const AccountCard = ({balance, type, id, interest}) => {

    let navigate = useNavigate()

    const {currentUser} = useContext(UserContext)

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
                <NavLink exact to={`/users/${currentUser.username}/account/${id}`} className="account-statement-btn">Manage</NavLink>
            </div>
            
        </div>
    )
}

export default AccountCard