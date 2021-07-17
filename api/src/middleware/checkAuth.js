const jwt = require('jsonwebtoken');

// Check if jwt sent in cookies is valid
// if valid, set req.userData 
module.exports = (req, res, next) => {
  const token = req.cookies.user;

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if(err) {
      return res.status(401).json({
        message: "Invalid Token"
      });
    }

    req.userData = decoded;
    next();
  });
}