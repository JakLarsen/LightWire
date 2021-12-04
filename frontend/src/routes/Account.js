import React, {useState, useContext, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../css/Account.css'
import UserContext from '../UserContext'
import LoadingSpinner from "../common/LoadingSpinner";
import Transaction from './Transaction';




const Account = ({deleteAccount}) => {

    let navigate = useNavigate()
    const {id} = useParams()

    const {currentUser, accounts, setAccounts} = useContext(UserContext)

    const INITIAL_CURRENT_ACCOUNT = {
        id: id,
        username: currentUser.username,
        balance: undefined,
        open_date: undefined,
        account_type: undefined,
        interest: undefined
    }

    const [currentAccount, setCurrentAccount] = useState(INITIAL_CURRENT_ACCOUNT)
    const [infoLoaded, setInfoLoaded] = useState(false);

    const handleDeleteClick = async (e) => {
        console.debug('Account: handleDeleteClick()')
        e.preventDefault()

        let dataObj = {
            username: currentUser.username,
            id: id
        }
         // in App.js, deleteAccount()
         let result = await deleteAccount(dataObj)
        //  Check for form errors from API
         console.log(`Delete Account result: `, result)
         if (result.success) {
             navigate("/accounts-home");
         } 
         else{
             console.log('Something went wrong')
         }
    }

    //Need to use an infoLoaded catch to make sure we have a returned loading value until the account info loads
    useEffect( async () => {
        async function fetchAccountInfo(){
            console.debug('fetchAccountInfo(), ', accounts)

            let ourAccount = []
            accounts.forEach(account=>{
                if (account.id == id){
                    ourAccount.push(account)
                }
            })
            setCurrentAccount(ourAccount[0])
            setInfoLoaded(true);
        }
        setInfoLoaded(false);
        fetchAccountInfo();
    },[])


    if (!infoLoaded) return <LoadingSpinner />;

    return (
        <div className="account">
            <div className="account-title">
                Account info for {currentAccount.account_type.toUpperCase()}x000{id}:
            </div>
            <div className="account-balace">Current Balance: ${currentAccount.balance.toFixed(2)}</div>

            {currentAccount.account_typetype != "credit" ? 
                <div className="account-interest"><span className="strong">(YR) INTEREST EST:</span> ${(currentAccount.balance*currentAccount.interest).toFixed(2)}</div>
                :
                <div className="account-interest"><span className="strong">(MO) INTEREST EST:</span> -${(currentAccount.balance*currentAccount.interest).toFixed(2)}</div>
            }

            <div className="account-transactions-wrap">
                <div className="account-transactions-card">
                    <div className="account-transactions-card-table-titles">
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
            <div className="account-delete-btn" onClick={handleDeleteClick}>Delete Account?</div>
        </div>
    )
}

export default Account