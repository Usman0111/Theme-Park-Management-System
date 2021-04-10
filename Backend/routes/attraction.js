const router = require("express").Router();
const pool = require("../db");
const validpass = require("../middleware/validpass");

//attraction routes

//get all attractions
router.get("/all", async (req, res) => {
  try {
    const attractions = await pool.query("SELECT * from attraction");

    res.json(attractions.rows);
  } catch (err) {
    console.log(err);
  }
});

//customer attraction
router.post("/all-customer", validpass, async (req, res) => {
  try {
    const attractions = await pool.query(
      "SELECT * from attraction WHERE archived=False"
    );

    res.json({ attractions: attractions.rows, time_left: req.time_left });
  } catch (err) {
    console.log(err);
  }
});

//visit
router.post("/visit", async (req, res) => {
  try {
    const { attraction_id, customer_id } = req.body;

    let attraction_visit;
    const alreadyVisited = await pool.query(
      "SELECT * FROM attractionvisit WHERE attraction_id=$1 AND customer_id=$2 AND date_visited = CURRENT_DATE",
      [attraction_id, customer_id]
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

module.exports = router;
