const jwt = require("jsonwebtoken");
const pool = require("../db");

module.exports = async (req, res, next) => {
  const { customer_id } = req.body;

  try {
    const validpasses = await pool.query(
      "SELECT *,  CURRENT_TIMESTAMP-passes.time_purchased as time_left from (SELECT *, CURRENT_TIMESTAMP-entrypass.time_purchased > INTERVAL '1 day' as expired from entrypass WHERE customer_id=$1) AS passes WHERE expired=False",
      [customer_id]
    );
    // console.log(validpasses.rows[0].time_left);

    if (validpasses.rows.length === 0) {
      return res.json("You have an unexpired entry pass");
    }
    req.time_left = validpasses.rows[0].time_left;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "valid pass check failed" });
  }
};
