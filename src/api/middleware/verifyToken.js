const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtkey = process.env.JWT_SECRET;

exports.verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];

      const payload = await new Promise((resolve, reject) => {
        jwt.verify(token, jwtkey, (error, decoded) => {
          if (error) {
            reject(error);
          } else {
            resolve(decoded);
          }
        });
      });

      req.user = payload;
      next();
    } else {
      res
        .status(403)
        .json({ message: "Accès interdit: token manquant ou mal formaté" });
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "Accès interdit: token invalide" });
  }
};
