          
          
          
                    // REACT ACCOUNTSHOME COMPONENT



            // IMPORTS AND SETUP



import '../css/AccountsHome.css';  
import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import LightWireAPI from '../LightWireAPI';
import Account from './Account';
import Transaction from './Transaction';




            // COMPONENT



const AccountsHome = ({deleteAccount}) => {

    let navigate = useNavigate()

    const { currentUser, setCurrentUser, accounts, setAccounts } = useContext(UserContext);

    useEffect(async function loadAccountInfo(){
        
        async function getUserAccounts(){
            console.debug("App useEffect loadAccountInfo");
            if(currentUser){
                try {
                    console.log('There is a current user:', currentUser)
                    let results = await LightWireAPI.getAccounts({currentUser})
                    console.log('useEFFECT loadAccountInfo() results:', results)
                    setAccounts(results.accounts)
                } 
                catch (e) {
                    console.error('getUserAccounts Error: ', e.stack)
                }
            }
            else{
                console.log('No current user:', currentUser)
            }
        }
        getUserAccounts()
    },[])

    const handleClick = (e) => {
        e.preventDefault()
        navigate(`/users/${currentUser.username}/create-account`)
    }


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
                        <Transaction date={'Nov. 28, 2021'} desc={'Adobe Cloud'} amount={20.99}/>
                        <Transaction date={'Nov. 17, 2021'} desc={'PANERA'} amount={15.49}/>
                        <Transaction date={'Nov. 12, 2021'} desc={'HarborPark Crossfit'} amount={149.00}/>
                        <Transaction date={'Nov. 11, 2021'} desc={'PAYPAL'} amount={64.37}/>
                        <Transaction date={'Nov. 7, 2021'} desc={'Piano Lessons'} amount={49.00}/>
                        <Transaction date={'Nov. 4, 2021'} desc={'PAYPAL'} amount={44.12}/>
                    </div>
                </div>

                <div className="ProfileHome-accounts">
                    <div className="ProfileHome-accounts-title">My Accounts</div>
                    <div className="ProfileHome-accounts-card">
                        {accounts.map(account => (
                            <Account 
                                id={account.id}
                                balance={account.balance} 
                                type={account.account_type} 
                                interest={account.interest} 
                                deleteAccount={deleteAccount}
                            />
                        ))}
                        <div className="add-account-btn" onClick={handleClick}>Add Account</div>
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default AccountsHome
