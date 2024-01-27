const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtkey = process.env.JWT_SECRET;

exports.verifyToken = async (req, res, next) => {

  const authHeader = req.headers.authorization;


  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid Authorization format" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = await jwt.verify(token, jwtkey);
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ message: "Invalid token" });
    }
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(403).json({ message: "Token expired" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};
