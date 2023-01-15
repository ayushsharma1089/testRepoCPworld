const jwt = require("jsonwebtoken");
// middleware to validate token
const verifyToken = (req, res, next) => {
  const token = req.header("authorization").slice(7);
      console.log(token," tok kk k kk ");
  if (!token) return res.status(401).json({ error: "Access denied for you" });
  try {
      
    const verified = jwt.verify(token, "abc123");
    req.user = verified;
    next(); // to continue the flow
  } catch (err) {
    res.status(400).json({ error: "Token is not valid" });
  }
};
module.exports = verifyToken;