var jwt = require("jsonwebtoken");
const { usermodel } = require("../models/user.model");

const authenticate = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secretKey");

    req.user = await usermodel.findById(decoded.id).select("-password");

    next();
  } else {
    return res.status(401).send("No token found");
  }
};

module.exports = authenticate;
