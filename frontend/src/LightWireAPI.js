          
          
          
          // AXIOS API HANDLER FOR BACKEND API CALLS


      // IMPORTS AND SETUP



import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";



      // API



/**
 * Our Frontend to Backend API handler for LightWire
 **/
class LightWireAPI {

  static async request(endpoint, data = {}, method = "get"){

    console.debug(`LightWireAPI request: `, endpoint, data, method)
    
    const URL = `${BASE_URL}/${endpoint}`;

    const config = {
      method: method,
      url: URL,
      data: data
    }

    try{
      let res = await axios(config)
      return res
    }
    catch(e){
      console.error(e.stack)
    }
  }

  static async login(data){
    console.debug(`in API HANDLER login(): `, data)
    let res = await this.request(`auth/login`, data, 'post')
    return res.data
  }

  

}



export default LightWireAPI;
