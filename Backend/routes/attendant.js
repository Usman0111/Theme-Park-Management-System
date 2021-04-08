const router = require("express").Router();
const pool = require("../db");
const authorize = require("../middleware/authorize");

//get all assignment based on attendant_id;
router.get("/get-assignment", async (req, res) => {
  try {
    const { attendant_id } = req.body;
    const assignment = await pool.query(`SELECT * FROM AttendantAssignment
                                        WHERE attendant_id = $1`,
                                        [attendant_id]);

    res.json(assignment.rows);
  } catch (err) {
    console.log(err);
  }
});

//request maintainence;
router.put("/request-maintainence", async (req, res) => {
  try {
    const { ride_id, maintainer_id, breakdown_date, breakdown_description } = req.body;
    const udpateAttraction = await pool.query(
        `UPDATE ride SET broken = true
              WHERE ride_id = $1`,
              [ride_id]);
    const brokendown = await pool.query(
        `INSERT INTO RideBreakdowns 
              (ride_id, maintainer_id, breakdown_date, breakdown_description) 
              VALUES($1, $2, $3, $4) RETURNING *`,
              [ride_id, maintainer_id, breakdown_date, breakdown_description]);
            
    res.json(brokendown.rows[0]);

} catch (err) {
    res.json("error");
    console.log(err);
}
});

//declare rainout;
router.post("/declare-rainout", async (req, res) => {
  try {
    const { ride_id } = req.body;
    const rainout = await pool.query(
        `INSERT INTO riderainout (ride_id) VALUES($1) RETURNING *`,[ride_id]);
    const update = await pool.query(
        `UPDATE ride SET rainedout = true WHERE ride_id = $1`,[ride_id]);
    res.json(rainout.rows[0]);

} catch (err) {
    res.json("error");
    console.log(err);
}
});

//end rainout;
router.put("/end-rainout", async (req, res) => {
  try {
    const { ride_id } = req.body;
    const rainout = await pool.query(
        `UPDATE ride SET rainedout = false WHERE ride_id = $1 RETURNING *`,[ride_id]);
    res.json(rainout.rows[0]);

} catch (err) {
    res.json("error");
    console.log(err);
}
});

module.exports = router;
