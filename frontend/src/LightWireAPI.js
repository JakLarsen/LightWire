          
          
          
          // AXIOS API HANDLER FOR BACKEND API CALLS


      // IMPORTS AND SETUP



import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";



      // API



/**
 * Our Frontend to Backend API handler for LightWire
 *  - Requests an endpoint and method, sending data to endpoint in body, authorization in the header
 *  - Returns whatever results we are returning from our endpoints
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
   * Request POST to 'auth/login' endpoint
   *  - Requires: - Requires: {username: USERNAME, password:PASSWORD}
   *  - Returns {currentUser: USERNAME, _token: TOKEN} as res.data
   **/
  static async login(data){
    console.debug(`LightWireAPI login(): `, data)
    let res = await this.request(`auth/login`, data, 'post')
    return res.data
  }

  /**
   * Request POST to 'auth/register' endpoint
   *  - Requires: {username: USERNAME, password:PASSWORD, etc.(first_name, last_name, email, phone)}
   *  - Returns {registered: USERNAME, _token: TOKEN} as res.data
   **/
  static async signup(data){
    console.debug(`LightWireAPI signup(): `, data)
    let res = await this.request(`auth/register`, data, 'post')
    return res.data
  }

  static async getUserData(data){
    console.debug(`LightWireAPI getUserData(): `, data)
    const {username} = data
    let res = await this.request(`users/${username}`, data, 'get')
    return res.data
  }
  
  static async getAccounts(data){
    console.debug(`LightWireAPI getAccounts(): `, data)
    const {username} = data.currentUser
    let res = await this.request(`users/${username}/accounts`, data, 'get')
    return res.data
  }

  static async updateUser(data){
    console.debug(`LightWireAPI updateUser(): `, data)
    const username = data.username
    delete data.username
    let res = await this.request(`users/${username}`, data, 'PATCH')
    return res.data
  }

  static async deleteUser(data){
    console.debug(`LightWireAPI deleteUser()`)
    const username = data.username
    let res = await this.request(`users/${username}`, data, 'DELETE')
    return res.data
  }

  static async createAccount(data){
    console.debug(`LightWireAPI createAccount()`, data)
    const username = data.username
    let res = await this.request(`users/${username}/account`, data, "POST")
    return res.data
  }


  

}



export default LightWireAPI;
