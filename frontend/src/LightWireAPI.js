          
          
          
          // AXIOS API HANDLER FOR BACKEND API CALLS


      // IMPORTS AND SETUP



import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";



      // API



/**
 * Our Frontend to Backend API handler for LightWire
 *  - Requests an endpoint and method, sending data to endpoint in body, authorization in the header
 * 
 * Returns whatever results we are returning from our endpoints
 **/
class LightWireAPI {

  static token = undefined;

  static async request(endpoint, data = {}, method = "get"){
    console.debug(`LightWireAPI request: `, endpoint, data, method)
    
    const URL = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${LightWireAPI.token}` };

    const config = {
      method: method,
      url: URL,
      data: data,
      headers
    }

    try{
      let res = await axios(config)
      return res
    }
    catch(e){
      console.error(e.stack)
    }
  }

  /**
   * Log a user in
   * 
   * Request POST to 'auth/login' endpoint
   *  - Requires: - Requires: {username: USERNAME, password:PASSWORD}
   * 
   * Returns {currentUser: USERNAME, _token: TOKEN}
   **/
  static async login(data){
    console.debug(`LightWireAPI login(): `, data)
    let res = await this.request(`auth/login`, data, 'post')
    return res.data
  }

  /**
   * Register a user
   * 
   * Request POST to 'auth/register' endpoint
   *  - Requires: {username: USERNAME, password:PASSWORD, etc.(first_name, last_name, email, phone)}
   *  
   * Returns {registered: USERNAME, _token: TOKEN}
   **/
  static async signup(data){
    console.debug(`LightWireAPI signup(): `, data)
    let res = await this.request(`auth/register`, data, 'post')
    return res.data
  }

  /**
   * Get user row data by username
   * 
   * Request GET to `users/${username}` endpoint
   *  - Requires: {}
   *  
   * Returns {}
   **/
  static async getUserData(data){
    console.debug(`LightWireAPI getUserData(): `, data)
    const {username} = data
    let res = await this.request(`users/${username}`, data, 'get')
    return res.data
  }
  
  /**
   * Get accounts for a given username
   * 
   * Request GET to `users/${username}/accounts` endpoint
   *  - Requires: {}
   *  
   * Returns {}
   **/
  static async getAccounts(data){
    console.debug(`LightWireAPI getAccounts(): `, data)
    const {username} = data.currentUser
    let res = await this.request(`users/${username}/accounts`, data, 'get')
    return res.data
  }

  /**
   * Update user row data
   * 
   * Request PATCH to `users/${username}` endpoint
   *  - Requires: {}
   *  
   * Returns {}
   **/
  static async updateUser(data){
    console.debug(`LightWireAPI updateUser(): `, data)
    const username = data.username
    delete data.username
    let res = await this.request(`users/${username}`, data, 'PATCH')
    return res.data
  }

  /**
   * Delete user from DB
   * 
   * Request DELETE to `users/${username}` endpoint
   *  - Requires: {}
   *  
   * Returns {}
   **/
  static async deleteUser(data){
    console.debug(`LightWireAPI deleteUser()`)
    const username = data.username
    let res = await this.request(`users/${username}`, data, 'DELETE')
    return res.data
  }

  /**
   * Create account row associated with user in DB
   * 
   * Request POST to `users/${username}/account` endpoint
   *  - Requires: {}
   *  
   * Returns {}
   **/
  static async createAccount(data){
    console.debug(`LightWireAPI createAccount()`, data)
    const username = data.username
    let res = await this.request(`users/${username}/account`, data, "POST")
    return res.data
  }

  /**
   * Delete account from DB
   * 
   * Request DELETE to `users/${data.username}/account/${data.id}` endpoint
   *  - Requires: {}
   *  
   * Returns {}
   **/
  static async deleteAccount(data){
    console.debug(`LightWireAPI deleteAccount()`, data)
    const {username, id} = data
    console.log(username, id)
    let res = await this.request(`users/${data.username}/account/${data.id}`, data, "DELETE")
    return res.data
  }

  /**
   * Create transaction row in DB (withdrawal, deposit, transfer)
   * Update one or more account row 'balance' properties based on transaction type
   * 
   * Request POST to `users/${username}/account/${id}/transaction` endpoint
   *  - Requires: {}
   *  
   * Returns {}
   * 
   * Requests PATCH to `users/${username}/account/${id}` endpoint
   *  - Requires: {}
   *  
   * Returns {}
   **/
  static async updateBalance(data, username){
    console.debug(`LightWireAPI updateBalance()`, data)
    let amount;
    const id = data.acc_sending_id
    if (data.deposit){
      data.amount = data.deposit
      delete data.deposit
      data.acc_sending_id = undefined
    }
    else if (data.withdrawal){
      data.amount = data.withdrawal
      delete data.withdrawal
      data.acc_receiving_id = undefined
    }
    else if (data.transfer){
      data.amount = data.transfer
      delete data.transfer
    }
    //Create transaction
    let transactionRes = await this.request(`users/${username}/account/${id}/transaction`, data, "POST")
    //Update accounts
    let balanceRes = await this.request(`users/${username}/account/${id}`, data, "PATCH")
  }

  // static async getTransactionsByAccountID(data){

  // }



}



export default LightWireAPI;
