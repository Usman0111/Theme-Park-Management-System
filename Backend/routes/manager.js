const router = require("express").Router();
const pool = require("../db");
const authorize = require("../middleware/authorize");

//manager-ride
router.post("/ride-create", authorize, async (req, res) => {
  try {
    const role = req.user.type;
    if (role == "manager") {
      const { name, description, location, broken, rainedout } = req.body;
      const newRide = await pool.query(
        "INSERT INTO ride (name, description, location, broken, rainedout) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, description, location, broken, rainedout]
      );
      res.json(newRide.rows[0]);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/assign-attendant-ride", authorize, async (req, res) => {
  try {
    const { account_id, ride_id } = req.body;
    const newAssign = await pool.query(
      "INSERT INTO AttendantAssignment (attendant_id, ride_id) VALUES ($1, $2) RETURNING *",
      [account_id, ride_id]
    );
    res.json(newAssign.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

//manager-attraction
router.post("/assign-attendant-attraction", authorize, async (req, res) => {
  try {
    const { account_id, attraction_id } = req.body;
    const newAssign = await pool.query(
      "INSERT INTO AttendantAssignment (attendant_id, attraction_id) VALUES ($1, $2) RETURNING *",
      [account_id, attraction_id]
    );
    res.json(newAssign.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

//manger-report
router.get("/customer-count", authorize, async (req, res) => {
  try {
    const countCustomer = await pool.query(
      "SELECT COUNT(account_id) FROM UserAccount WHERE user_type = 'customer' RETURNING *"
    );
    res.json(countCustomer.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

router.get("/visit-per-month", authorize, async (req, res) => {
  try {
    const visitPermonth = await pool.query(
      "SELECT COUNT(*) FROM EntryPass GROUP BY MONTH(time_purchased) + '-' + YEAR(time_purchased)"
    );
    res.json(visitPermonth.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

router.get("/brokendown-per-month", authorize, async (req, res) => {
  try {
    const brokendownPermonth = await pool.query(
      "SELECT COUNT(*) FROM RideBreakdowns GROUP BY MONTH(breakdown_date) + '-' + YEAR(breakdown_date)"
    );
    res.json(brokendownPermonth.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

router.get("/rideusage-frequency", authorize, async (req, res) => {
  try {
    const { ride_id } = req.body;
    const usageFreq = await pool.query(
      "SELECT COUNT(*) FROM RideUsage WHERE ride_id = $1 GROUP BY MONTH(date_used) + '-' + YEAR(date_used)"[
        ride_id
      ]
    );
    res.json(usageFreq.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

router.get("/rainedout-per-month", authorize, async (req, res) => {
  try {
    const rainedout = await pool.query(
      "SELECT COUNT(*) FROM RideRainout GROUP BY MONTH(date_rainedout) + '-' + YEAR(date_rainedout)"
    );
    res.json(rainedout.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
