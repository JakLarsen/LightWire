          
          
          
                    // REACT PROFILE HOME COMPONENT



            // IMPORTS AND SETUP



import '../css/ProfileHome.css';  
import React from 'react';




            // COMPONENT



const Home = () => {


    return (
        <div className="ProfileHome">
            <div className="ProfileHome-top-wrap">
                <div className="ProfileHome-recent">
                    <div className="ProfileHome-recent-title">Recent Transactions</div>
                    <div className="ProfileHome-recent-card">
                        <div className="ProfileHome-recent-card-table-titles">
                            <div className="table-date table-title">Date</div>
                            <div className="table-desc table-title">Description</div>
                            <div className="table-amount table-title">Amount</div>
                        </div>
                        <div className="transaction">
                            <div className="table-date transaction-date">Nov. 11, 2021</div>
                            <div className="table-desc transaction-desc">Adobe Cloud</div>
                            <div className="table-amount transaction-amount">$20.99</div>
                        </div>
                        <div className="transaction">
                            <div className="table-date transaction-date">Nov. 8, 2021</div>
                            <div className="table-desc transaction-desc">PANERA</div>
                            <div className="table-amount transaction-amount">$15.49</div>
                        </div>
                        <div className="transaction">
                            <div className="table-date transaction-date">Nov. 2, 2021</div>
                            <div className="table-desc transaction-desc">HarborPark Crossfit</div>
                            <div className="table-amount transaction-amount">$149.00</div>
                        </div>
                        <div className="transaction">
                            <div className="table-date transaction-date">Nov. 1, 2021</div>
                            <div className="table-desc transaction-desc">Piano Lessons</div>
                            <div className="table-amount transaction-amount">$49.00</div>
                        </div>
                        <div className="transaction">
                            <div className="table-date transaction-date">Nov. 1, 2021</div>
                            <div className="table-desc transaction-desc">PAYPAL</div>
                            <div className="table-amount transaction-amount">$64.37</div>
                        </div>
                        <div className="transaction">
                            <div className="table-date transaction-date">Nov. 1, 2021</div>
                            <div className="table-desc transaction-desc">PAYPAL</div>
                            <div className="table-amount transaction-amount">$94.54</div>
                        </div>
                        <div className="transaction">
                            <div className="table-date transaction-date">Nov. 1, 2021</div>
                            <div className="table-desc transaction-desc">PAYPAL</div>
                            <div className="table-amount transaction-amount">$44.54</div>
                        </div>
                        
                    </div>
                </div>
                <div className="ProfileHome-accounts">
                    <div className="ProfileHome-accounts-title">My Accounts</div>
                    <div className="ProfileHome-accounts-card">
                        <div className="account">
                            <div className="account-title">SAVINGS ACC: x9142</div>
                            <div className="account-balance"><span className="strong">BALANCE:</span> $54,430.00</div>
                            <div className="account-apr"><span className="strong">INTEREST:</span> 2.00%</div>
                            <div className="account-interest"><span className="strong">(YR) INTEREST EST:</span> ${54430 *0.02}</div>
                            <div className="account-transactions-btn">Transactions</div>
                        </div>
                        <div className="account">
                            <div className="account-title">CHECKING ACC: x4133</div>
                            <div className="account-balance"><span className="strong">BALANCE:</span> $14,430.00</div>
                            <div className="account-apr"><span className="strong">INTEREST:</span> 1.00%</div>
                            <div className="account-interest"><span className="strong">(YR) INTEREST EST:</span> ${14430 *0.01}</div>
                            <div className="account-transactions-btn">Transactions</div>
                        </div>
                        <div className="account">
                            <div className="account-title">CREDIT CARD: x2770</div>
                            <div className="account-balance"><span className="strong">USAGE:</span> $4,112.00 / $20,000</div>
                            <div className="account-apr"><span className="strong">APR:</span> 24.00%</div>
                            <div className="account-interest"><span className="strong">(MO) INTEREST EST:</span> -${4112 *0.02}</div>
                            <div className="account-transactions-btn">Transactions</div>
                        </div>
                      
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}

export default Home
