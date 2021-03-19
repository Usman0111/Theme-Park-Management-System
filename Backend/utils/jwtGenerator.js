const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtGenerator = (user_id, user_type) => {
  const payload = {
    user: {
      id: user_id,
      type: user_type,
    },
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = jwtGenerator;
