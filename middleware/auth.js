const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user; // this is the properly authenticated user which we can use in our different protected routes or for ex get profile
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
