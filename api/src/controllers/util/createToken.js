const jwt = require('jsonwebtoken');

module.exports = (user) => {
  const token = jwt.sign(
    {
      userId: user._id,
      username: user.username
    },
    process.env.JWT_KEY,
    {
      expiresIn: "1d",
    }
  );

  return token;
}