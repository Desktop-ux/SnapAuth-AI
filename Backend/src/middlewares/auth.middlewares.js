const jwt = require("jsonwebtoken");
const usermodel = require("../models/user.models");

async function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized 🔐" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("JWT PAYLOAD 👉", decoded); // remove after test

    const user = await usermodel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found ❌" });
    }

    req.user = user; 
    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid token ❌" });
  }
}

module.exports = authMiddleware;
