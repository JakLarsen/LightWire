


                    //REACT TRANSACTION



            //IMPORTS AND SETUP



import React from 'react'
import '../css/Transaction.css'



            //TRANSACTION COMPONENT



const Transaction = ({date, desc, amount}) => {

    return (
        <div className="transaction">
            <div className="table-date transaction-date">{date}</div>
            <div className="table-desc transaction-desc">{desc}</div>
            <div className="table-amount transaction-amount">${amount}</div>
        </div>
    )
}

export default Transaction