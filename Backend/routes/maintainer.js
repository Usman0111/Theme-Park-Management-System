const router = require("express").Router();
const pool = require("../db");
const authorize = require("../middleware/authorize");

//get all maintainence based on maintainer_id;
router.get("/all-maintainence-requests", async (req, res) => {
  try {
    const breakdowns = await pool.query(
      `SELECT * FROM ridebreakdowns, ride
                      WHERE maintainer_id IS NULL AND ridebreakdowns.ride_id = ride.ride_id`
    );

    res.json(breakdowns.rows);
  } catch (err) {
    console.log(err);
  }
});

//resolve-requesst, update the ride able set broken = false;
router.put("/resolve-request", async (req, res) => {
  try {
    const { ride_id, maintainer_id } = req.body;
    const udpateride = await pool.query(
      `UPDATE ride SET broken = false
              WHERE ride_id = $1 RETURNING *`,
      [ride_id]
    );
    const putMaintainerId = await pool.query(
      `UPDATE RideBreakdowns SET maintainer_id = $1
                      WHERE ride_id = $2 AND maintainer_id IS NULL RETURNING *`,
      [maintainer_id, ride_id]
    );
    res.json(putMaintainerId.rows[0]);
  } catch (err) {
    res.json("error");
    console.log(err);
  }
});

//get all maintainence based on maintainer_id;
router.post("/resolved-requests", async (req, res) => {
  try {
    const { maintainer_id } = req.body;
    const breakdowns = await pool.query(
      `SELECT * FROM ridebreakdowns, ride WHERE maintainer_id = $1 AND ridebreakdowns.ride_id = ride.ride_id`,
      [maintainer_id]
    );

    res.json(breakdowns.rows);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
