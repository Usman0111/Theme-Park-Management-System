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
router.post("/request-maintainence", async (req, res) => {
  try {
    const { ride_id, breakdown_date, breakdown_description } = req.body;
    const udpateAttraction = await pool.query(
        `UPDATE ride SET broken = true
              WHERE ride_id = $1`,
              [ride_id]);
    const unresolved = await pool.query(
        `SELECT * FROM RideBreakdowns WHERE ride_id = $1 AND maintainer_id IS NULL`, [ride_id]);
      if (unresolved.rowCount == 0) {
        const brokendown = await pool.query(
          `INSERT INTO RideBreakdowns 
                (ride_id, breakdown_date, breakdown_description) 
                VALUES($1, $2, $3) RETURNING *`,
                [ride_id, breakdown_date, breakdown_description]);
        res.json("reported");
      }
      else
      {
        return res.status(401).send("Already reported!");
      }
            
    

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
