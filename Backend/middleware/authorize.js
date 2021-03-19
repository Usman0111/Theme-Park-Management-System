const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.header("token");

  if (!token) {
    return res.status(403).json({ msg: "authorization denied" });
  }

  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verify.user;
    // console.log(verify.user);
    next();
  } catch (err) {
    // console.log(err);
    res.status(401).json({ msg: "token is not valid" });
  }
};
