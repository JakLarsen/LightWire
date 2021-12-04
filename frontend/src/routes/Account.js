import React, {useState, useContext, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../css/Account.css'
import UserContext from '../UserContext'
import LoadingSpinner from "../common/LoadingSpinner";
import Transaction from './Transaction';




const Account = ({deleteAccount, updateBalance}) => {

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

    const INITIAL_WITHDRAWAL_FORMDATA = {
        withdrawal: 0,
        acc_sending_id: currentAccount.id,
        acc_receiving_id: currentAccount.id,
        transaction_date: "12/4/21"
    }
    const INITIAL_DEPOSIT_FORMDATA = {
        deposit: 0,
        acc_sending_id: currentAccount.id,
        acc_receiving_id: currentAccount.id,
        transaction_date: "12/4/21"
        
    }
    const INITIAL_TRANSFER_FORMDATA = {
        transfer: 0,
        acc_receiving_id: 0,
        acc_sending_id: currentAccount.id,
        transaction_date: "12/4/21"
    }
    const INITIAL_FORMERRORS = []
    const [withdrawalFormData, setWithdrawalFormData] = useState(INITIAL_WITHDRAWAL_FORMDATA)
    const [depositFormData, setDepositFormData] = useState(INITIAL_DEPOSIT_FORMDATA)
    const [transferFormData, setTransferFormData] = useState(INITIAL_TRANSFER_FORMDATA)
    const [formErrors, setFormErrors] = useState(INITIAL_FORMERRORS)

    const handleWithdrawalChange = (e) => {
        const {name, value} = e.target
        setWithdrawalFormData(data => ({ ...data, [name]: value}));
        console.log(name, value)
    }
    const handleWithdrawalSubmit = async (e) => {
        console.debug('handleWithdrawalSubmit() ', withdrawalFormData)
        e.preventDefault();
        //Validation
    
        //updateBalance from App.js
        let result = await updateBalance(withdrawalFormData)
        //Check for form errors from API
        if (result.success) {
            navigate("/accounts-home");
        } 
        else{
            setFormErrors(result.errors);
        }
    }

    const handleDepositChange = (e) => {
        const {name, value} = e.target
        setDepositFormData(data => ({ ...data, [name]: value }));
        console.log(name, value)
    }
    const handleDepositSubmit = async (e) => {
        console.debug('handleDepositSubmit() ', depositFormData)
        e.preventDefault();
        //Validation
    
        //updateBalance from App.js
        let result = await updateBalance(depositFormData)
        //Check for form errors from API
        // console.log(`updateBalance result: `, result)
        if (result.success) {
            navigate("/accounts-home");
        } 
        else{
            setFormErrors(result.errors);
        }
    }

    const handleTransferChange = (e) => {
        const {name, value} = e.target
        setTransferFormData(data => ({ ...data, [name]: value }));
        console.log(name, value)
    }
    const handleTransferSubmit = async (e) => {
        console.debug('handleTransferSubmit() ', transferFormData)
        e.preventDefault();
        //Validation
    
        //updateBalance from App.js
        let result = await updateBalance(transferFormData)
        //Check for form errors from API
        if (result.success) {
            navigate("/accounts-home");
        } 
        else{
            setFormErrors(result.errors);
        }
    }

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

            <div className="account-actions">
                <div className="account-actions-top">
                    <div className="account-form-wrap">
                        <div className="account-form-title">Withdraw</div>
                        <form className="account-withdrawal" onSubmit={handleWithdrawalSubmit}>
                            <label className="account-form-label" htmlFor="withdrawal">Withdrawal Amount (USD) </label>
                            <input 
                                className="account-form-input" name="withdrawal"
                                type="number" 
                                value={withdrawalFormData.withdrawal} onChange={handleWithdrawalChange}
                            />
                        <div className="account-transaction-btn" onClick={handleWithdrawalSubmit}>Withdraw</div>
                    </form>

                    </div>
    
                    <div className="account-form-wrap">
                        <div className="account-form-title">Deposit</div>
                        <form className="account-deposit">
                        <label className="account-form-label" htmlFor="deposit">Deposit Amount (USD) </label>
                            <input 
                                className="account-form-input" name="deposit"
                                type="number"
                                value={depositFormData.deposit} onChange={handleDepositChange}
                            />
                            <div className="account-transaction-btn" onClick={handleDepositSubmit}>Deposit</div>
                        </form>
                    </div>
                    <div className="form-errors">{formErrors}</div>
                
                </div>
                <div className="account-actions-bottom">
                <div className="account-form-wrap">
                    <div className="account-form-title">Transfer</div>
                        <form className="account-transfer">
                            <div className="label-input-wrap account-transfer-label-input-wrap">
                                <label className="account-form-label" htmlFor="transfer">Transfer Amount (USD) </label>
                                <input 
                                    className="account-form-input" name="transfer"
                                    type="number"
                                    value={transferFormData.transfer} onChange={handleTransferChange}
                                />
                            </div>
                            <div className="label-input-wrap">
                                <label className="account-form-label" htmlFor="acc-receiving">To Account # </label>
                                <input 
                                    className="account-form-input" name="acc_receiving_id"
                                    type="number"
                                    value={transferFormData.acc_receiving_id} onChange={handleTransferChange}
                                />
                                <div className="account-transaction-btn" onClick={handleTransferSubmit}>Transfer</div>
                            </div>

                        </form>
                    </div>
                </div>
                
            </div>

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
            <div className="account-delete-btn" onClick={handleDeleteClick}>Close Account</div>
        </div>
    )
}

export default Account