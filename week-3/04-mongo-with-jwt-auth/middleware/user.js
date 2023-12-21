const jwt = require('jsonwebtoken')
function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  try {
    const bearerToken = req.headers['authorization'].replace("Bearer ", "");
    const userData = jwt.verify(bearerToken, process.env.JWT_PASS);
    if(!userData) {
      return res.status(403).send("Unauthorized!");
    }
    req.username = userData.username;
    next();
  } catch (error) {
    console.log("Error: " + error);
    res.status(401).send("Token is invalid");    
  }
}

module.exports = userMiddleware;
