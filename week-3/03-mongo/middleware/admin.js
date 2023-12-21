// Middleware for handling auth
const { Admin } = require("../db/index");
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const { username, password } = req.headers;
  const adminExist = await Admin.findOne({
    username: username,
    password: password,
  });
  if (adminExist) {
    next();
  } else {
    res.status(401).send("Unothorised!");
  }
}

module.exports = adminMiddleware;
