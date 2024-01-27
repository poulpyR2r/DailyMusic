const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtkey = process.env.JWT_SECRET;

exports.verifyIfIsAdmin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtkey);

    if (decoded.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Access denied: you are not an admin" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
