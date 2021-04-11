const router = require("express").Router();
const pool = require("../db");

//get all rides
router.post("/purchase-pass", async (req, res) => {
  try {
    const { user_id } = req.body;
    const validpasses = await pool.query(
      "SELECT *, CURRENT_TIMESTAMP-passes.time_purchased as time_left from (SELECT *, CURRENT_TIMESTAMP-entrypass.time_purchased > INTERVAL '1 day' as expired from entrypass WHERE customer_id=$1) AS passes WHERE expired=False",
      [user_id]
    );

    if (validpasses.rows.length !== 0) {
      return res.json("you already have a valid pass");
    }

    const pass = await pool.query(
      "INSERT INTO entrypass(customer_id,time_purchased) VALUES($1, CURRENT_TIMESTAMP) RETURNING *",
      [user_id]
    );

    res.json(pass.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

router.post("/get-all-pass", async (req, res) => {
  try {
    const { user_id } = req.body;

    const passes = await pool.query(
      "SELECT *, CURRENT_TIMESTAMP-entrypass.time_purchased > INTERVAL '1 day' as expired from entrypass WHERE customer_id=$1",
      [user_id]
    );

    res.json(passes.rows);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
