                    
                    
                    
                    // HELPER FUNCTIONS



            // IMPORTS AND SETUP



const jwt = require("jsonwebtoken");
const { SECRET_KEY, JWT_OPTIONS } = require("../config");



      // FUNCTIONS



function createToken(user){
  let payload = {
    username: user.username,
    admin: user.is_admin
  }
  return jwt.sign(payload, SECRET_KEY, JWT_OPTIONS)
}



module.exports = { createToken };
