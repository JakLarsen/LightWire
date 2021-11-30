          
          
          
                    // REACT PROFILE HOME COMPONENT



            // IMPORTS AND SETUP



import '../css/ProfileHome.css';  
import React, {useState, useEffect, useContext} from 'react';
import UserContext from '../UserContext';
import LightWireAPI from '../LightWireAPI';
import Account from './Account';




            // COMPONENT



const ProfileHome = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext);

    const INITIAL_ACCOUNTS = []
    const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS)

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
                        {accounts.map(account => (
                            <Account/>
                        ))}
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}

export default ProfileHome
