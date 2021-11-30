import React from 'react'
import '../css/Account.css'




const Account = () => {

    return (
        <div className="account">
            <div className="account-title">SAVINGS ACC: x9142</div>
            <div className="account-balance"><span className="strong">BALANCE:</span> $54,430.00</div>
            <div className="account-apr"><span className="strong">INTEREST:</span> 2.00%</div>
            <div className="account-interest"><span className="strong">(YR) INTEREST EST:</span> ${54430 *0.02}</div>
            <div className="account-transactions-btn">Statements</div>
        </div>
    )
}

export default Account