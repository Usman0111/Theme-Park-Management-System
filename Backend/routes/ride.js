const router = require("express").Router();
const pool = require("../db");
const validpass = require("../middleware/validpass");

//ride routes

//get all rides
router.get("/all", async (req, res) => {
  try {
    const rides = await pool.query(
      "SELECT * from ride LEFT JOIN useraccount ON ride.attendant_id = useraccount.account_id ORDER BY ride.ride_id ASC"
    );

    res.json(rides.rows);
  } catch (err) {
    console.log(err);
  }
});

// customer rides
router.post("/all-customer", validpass, async (req, res) => {
  try {
    const rides = await pool.query(
      "SELECT * FROM ride WHERE archived=False ORDER BY ride.ride_id ASC"
    );

    res.json({ rides: rides.rows, time_left: req.time_left });
  } catch (err) {
    console.log(err);
  }
});

//visit
router.post("/ride", async (req, res) => {
  try {
    const { ride_id, customer_id } = req.body;

    let ride_ride;
    const alreadyride = await pool.query(
      "SELECT * FROM rideusage WHERE ride_id=$1 AND customer_id=$2 AND date_used = CURRENT_DATE",
      [ride_id, customer_id]
    );

    if (alreadyride.rows.length !== 0) {
      //if the customer previously visited this ride today, increment the visit count

      ride_ride = await pool.query(
        "UPDATE rideusage SET usage_count = usage_count + 1 WHERE usage_id=$1 RETURNING *",
        [alreadyride.rows[0].usage_id]
      );
    } else {
      //if the customer is visting the for the first time, add a new entry for today

      ride_ride = await pool.query(
        "INSERT INTO rideusage(ride_id,customer_id) VALUES($1,$2) RETURNING *",
        [ride_id, customer_id]
      );
    }

    res.json(ride_ride.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
