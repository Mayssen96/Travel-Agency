const jwt = require("jsonwebtoken");
const userSchema = require("../models/user.Schema");

exports.isAuth = async (req, res, next) => {
  const token = req.header('Authorization');

  try {
    if (!token) {
      return res.status(404).send({ msg: "Invalid token" });
    }
    const decoded = await jwt.verify(token, process.env.passwordToken);
    
    if (!decoded) {
      return res.status(404).send({ msg: "Invalid token" });
    }

    const user = await userSchema.findById(decoded.id);
  
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).send({ msg: "Invalid token" });
  } 
};


exports.verifyAdmin = async (req, res, next) => {
  const token = req.header('Authorization');
 
  try {
    const decoded = await jwt.verify(token, process.env.passwordToken);
    
    if (!decoded) {
      return res.status(404).send({ msg: "Invalid token" });
    }
  
    const user = await userSchema.findById(decoded.id);
    if (user.isAdmin) {
      next();
    }
  } catch (error) {
    return res.status(500).send({ msg: "not admin" });
  }
};
