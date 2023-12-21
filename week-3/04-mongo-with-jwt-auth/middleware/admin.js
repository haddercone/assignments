// Middleware for handling auth
const jwt = require('jsonwebtoken')
require('dotenv').config();

function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  // const { username, password } = req.headers;
  const bearerToken = req.headers['authorization'].replace("Bearer ", "");
  try {
    const isTokenValid = jwt.verify(bearerToken, process.env.JWT_PASS);
    if(isTokenValid) {
      next();
    } else {
      res.status(403).send("Unauthorized!");
    }
  } catch (error) {
    console.log("Error: " + error);
    res.status(401).send("Token is invalid");    
  }
}

module.exports = adminMiddleware;
