const router = require("express").Router();
const pool = require("../db");
const authorize = require("../middleware/authorize");

//attraction routes

//get all attractions
router.get("/all", async (req, res) => {
  try {
    const attractions = await pool.query("SELECT * FROM attraction");

    res.json(attractions.rows);
  } catch (err) {
    console.log(err);
  }
});

//attraction visit routes

//visit
router.post("/visit", async (req, res) => {
  try {
    const { attraction_id, customer_id } = req.body;

    let attraction_visit;
    const alreadyVisited = await pool.query(
      "SELECT * FROM attractionvisit WHERE customer_id=$1 AND date_visited = CURRENT_DATE",
      [customer_id]
    );

    if (alreadyVisited.rows.length !== 0) {
      //if the customer previously visited this attraction today, increment the visit count

      attraction_visit = await pool.query(
        "UPDATE attractionvisit SET visit_count = visit_count + 1 WHERE visit_id=$1 RETURNING *",
        [alreadyVisited.rows[0].visit_id]
      );
    } else {
      //if the customer is visting the for the first time, add a new entry for today

      attraction_visit = await pool.query(
        "INSERT INTO attractionvisit(attraction_id,customer_id) VALUES($1,$2) RETURNING *",
        [attraction_id, customer_id]
      );
    }

    res.json(attraction_visit.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

router.post("/retreive-visits", async (req, res) => {
  try {
    const { customer_id } = req.body;

    const attraction_visits = await pool.query(
      "SELECT * from attractionvisit where customer_id = $1",
      [customer_id]
    );

    res.json(attraction_visits.rows);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
