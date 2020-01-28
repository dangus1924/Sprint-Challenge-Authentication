/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');


const authenticated = (req, res, next) => {
  const token = req.headers.authentication;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).end()
      } else {
        req.decodeJwt = decodedToken;
        next();
      }
    })
  } else {
    res.status(403).end()
  }
}

module.exports = authenticated