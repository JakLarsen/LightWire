          
          
          
          // AXIOS API HANDLER FOR BACKEND API CALLS


      // IMPORTS AND SETUP



import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";



      // API



/**
 * Our Frontend to Backend API handler for LightWire
 *  - Requests an endpoint and method, sending data to endpoint in body
 *  - Returns whatever results we are returning from our endpoints
 **/
class LightWireAPI {

  static token = undefined;

  static async request(endpoint, data = {}, method = "get"){

    console.debug(`LightWireAPI request: `, endpoint, data, method)
    
    const URL = `${BASE_URL}/${endpoint}`;
    console.log('TOKEN', LightWireAPI.token)
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
   * Request POST to auth/login endpoint
   *  - Returns {currentUser: USERNAME, _token: TOKEN} as res.data
   **/
  static async login(data){
    console.debug(`in API HANDLER login(): `, data)
    let res = await this.request(`auth/login`, data, 'post')
    return res.data
  }

  /**
   * Request POST to auth/register endpoint
   *  - Returns {registered: USERNAME, _token: TOKEN} as res.data
   **/
  static async signup(data){
    console.debug(`API HANDLER signup(): `, data)
    let res = await this.request(`auth/register`, data, 'post')
    return res.data
  }

  static async getUserData(data){
    console.debug(`API HANDLER getUserData(): `, data)
    const {username} = data
    let res = await this.request(`users/${username}`, data, 'get')
    return res.data
  }
  
  static async getAccounts(data){
    console.debug(`API HANDLER getAccounts(): `, data)
    const {username} = data.currentUser
    let res = await this.request(`users/${username}/accounts`, data, 'get')
    return res.data
  }
  

}



export default LightWireAPI;
