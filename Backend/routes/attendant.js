const router = require("express").Router();
const pool = require("../db");

router.post("/get-assignment", async (req, res) => {
  try {
    const { attendant_id } = req.body;
    const assignment = await pool.query(
      `SELECT * FROM attendantassignment WHERE attendant_id = $1`,
      [attendant_id]
    );

    if (assignment.rows.length === 0) {
      return res.json("No assignment");
    }

    if (assignment.rows[0].assignment_type == "ride") {
      const ride = await pool.query(
        "SELECT * from ride WHERE attendant_id = $1",
        [attendant_id]
      );
      return res.json({
        type: "ride",
        assignment: ride.rows[0],
      });
    }

    if (assignment.rows[0].assignment_type == "attraction") {
      const attraction = await pool.query(
        "SELECT * from attraction WHERE attendant_id = $1",
        [attendant_id]
      );
      return res.json({
        type: "attraction",
        assignment: attraction.rows[0],
      });
    }

    // if other assignment routes are properly implemented
    // it should never get to this point
    res.json("no ride or attraction found");
  } catch (err) {
    console.log(err);
  }
});

//request maintainence;
router.put("/request-maintainence", async (req, res) => {
  try {
    const { ride_id, breakdown_description, attendant_id } = req.body;

    const udpateAttraction = await pool.query(
      `UPDATE ride SET broken = true
              WHERE ride_id = $1 RETURNING *`,
      [ride_id]
    );
    const brokendown = await pool.query(
      `INSERT INTO RideBreakdowns 
              (ride_id, maintainer_id, breakdown_description, attendant_id, breakdown_date) 
              VALUES($1, $2, $3,$4, CURRENT_DATE) RETURNING *`,
      [ride_id, null, breakdown_description, attendant_id]
    );

    res.json({ ride: udpateAttraction.rows[0], breakdown: brokendown.rows[0] });
  } catch (err) {
    res.json("error");
    console.log(err);
  }
});

//declare rainout;
const validRainoutTypes = ["ride", "attraction"];

router.put("/declare-rainout", async (req, res) => {
  try {
    const { rainout_type, attendant_id } = req.body;
    if (!validRainoutTypes.includes(rainout_type)) {
      return res.status(400).send("Invalid rainout type");
    }

    if (rainout_type === "ride") {
      const { ride_id } = req.body;

      const rainout = await pool.query(
        `INSERT INTO riderainout (ride_id,attendant_id) VALUES($1,$2) RETURNING *`,
        [ride_id, attendant_id]
      );

      const update = await pool.query(
        `UPDATE ride SET rainedout = true WHERE ride_id = $1 RETURNING *`,
        [ride_id]
      );
      return res.json(update.rows[0]);
    }

    if (rainout_type === "attraction") {
      const { attraction_id } = req.body;

      const rainout = await pool.query(
        `INSERT INTO attractionrainout (attraction_id,attendant_id) VALUES($1,$2) RETURNING *`,
        [attraction_id, attendant_id]
      );

      const update = await pool.query(
        `UPDATE attraction SET rainedout = true WHERE attraction_id = $1 RETURNING *`,
        [attraction_id]
      );
      return res.json(update.rows[0]);
    }
  } catch (err) {
    res.json("error");
    console.log(err);
  }
});

//end rainout;
router.put("/end-rainout", async (req, res) => {
  try {
    const { rainout_type } = req.body;
    if (!validRainoutTypes.includes(rainout_type)) {
      return res.status(400).send("Invalid rainout type");
    }

    if (rainout_type === "ride") {
      const { ride_id } = req.body;

      const update = await pool.query(
        `UPDATE ride SET rainedout = false WHERE ride_id = $1 RETURNING *`,
        [ride_id]
      );
      return res.json(update.rows[0]);
    }
    if (rainout_type === "attraction") {
      const { attraction_id } = req.body;

      const update = await pool.query(
        `UPDATE attraction SET rainedout = false WHERE attraction_id = $1 RETURNING *`,
        [attraction_id]
      );
      return res.json(update.rows[0]);
    }
  } catch (err) {
    res.json("error");
    console.log(err);
  }
});

module.exports = router;
