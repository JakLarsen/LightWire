# LightWire

 - Lightwire is a simple banking app project that focuses on the fundamentals that I've learned during the Springboard Fullstack Software Engineering Bootcamp: a secure, well-authenticated and well-architected API; a clean and coherent user interface and design; and an ease of use that makes it simple to accomplish everyday banking needs like setting up an account, transferring money, creating and viewing bank-statements and more.

 - Frontend and backend built out with JavaScript (React.Js, Express.Js, Node). PostgreSQL for database management, etc.

 - This is a bare-bones practice project built to iterate on creating and accessing a self-built API in JavaScript and is not intended for anything other than observational usage at the moment.

 - As a user you can:
   - Signup and Login with transient authentication (Your session will only last until browser refresh)
      - Persistent login will be added soon.
   - Edit your profile data
   - Create new accounts (i.e. savings, credit, checking)
   - Manage your accounts
   - Withdraw, deposit, and transfer to and from accounts
   - View and Search through Statements and transactions (coming soon)

 - The API is run on built with Express and allows you to reach authenticated endpoints by Logged-in User,
 Admin, or as the same user as intended. 

 - FRONTEND STARTUP (from frontend root) runs on http://localhost:3000/
    -   ### `npm start`
 - FRONTEND TESTING (from frontend root)
    -   ### `npm test`
    
 - BACKEND STARTUP (from backend root) runs on http://localhost:3001/
    -   ### `nodemon server.js`
 - BACKEND TESTING (from backend root)
    -   ### `jest`, `jest filename.test.js`