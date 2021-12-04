import React, {useState, useContext, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../css/Account.css'
import UserContext from '../UserContext'
import LoadingSpinner from "../common/LoadingSpinner";




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
            <div className="account-balace">Current Balance: ${currentAccount.balance}</div>

            {currentAccount.account_typetype != "credit" ? 
                <div className="account-interest"><span className="strong">(YR) INTEREST EST:</span> ${(currentAccount.balance*currentAccount.interest).toFixed(2)}</div>
                :
                <div className="account-interest"><span className="strong">(MO) INTEREST EST:</span> -${(currentAccount.balance*currentAccount.interest).toFixed(2)}</div>
            }
            <div className="account-delete-btn" onClick={handleDeleteClick}>X</div>
        </div>
    )
}

export default Account