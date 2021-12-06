


                    //ACCOUNT CARD COMPONENT



            //IMPORTS AND SETUP



import React, {useContext} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../css/AccountCard.css'
import UserContext from '../UserContext'



            //ACCOUNT CARD COMPONENT



const AccountCard = ({balance, type, id, interest}) => {

    let navigate = useNavigate()

    const {currentUser} = useContext(UserContext)

    return (
        <div className="account-card">
            <div className="account-card-title">{type.toUpperCase()} ACC: x000{id}</div>
            <div className="account-card-balance"><span className="strong">BALANCE:</span> ${balance.toFixed(2)}</div>
            <div className="account-card-interest"><span className="strong">INTEREST:</span> {interest * 100}.00%</div>
        
            {type != "credit" ? 
                <div className="account-card-interest"><span className="strong">(YR) INTEREST EST:</span> ${(balance*interest).toFixed(2)}</div>
                :
                <div className="account-card-interest"><span className="strong">(MO) INTEREST EST:</span> -${(balance*interest).toFixed(2)}</div>
            }
            <div className="account-card-btn-wrap">
                <NavLink exact to={`/users/${currentUser.username}/account/${id}`} className="account-card-statement-btn">Manage</NavLink>
            </div>
            
        </div>
    )
}

export default AccountCard