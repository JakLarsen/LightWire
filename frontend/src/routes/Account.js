import React from 'react'
import '../css/Account.css'




const Account = ({balance, type, id, interest}) => {

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
            <div className="account-transactions-btn">Statements</div>
        </div>
    )
}

export default Account