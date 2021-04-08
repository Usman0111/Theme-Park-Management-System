const router = require("express").Router();
const pool = require("../db");
const authorize = require("../middleware/authorize");

router.post("/ride-create", async (req, res) => {
  try {
    const {
      name,
      description,
      location, //broken, rainedout, new ride defatult false
      age_restriction,
      height_restriction,
      picture,
    } = req.body;

    //const querry = await pool.query('listen db_notification');

    const newRide = await pool.query(
      `INSERT INTO ride (name, 
                                    description, 
                                    location, 
                                    broken, 
                                    rainedout, 
                                    age_restriction, 
                                    height_restriction, 
                                    picture) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, pg_read_binary_file($8)) RETURNING *`,
      [
        name,
        description,
        location,
        true,
        false,
        age_restriction,
        height_restriction,
        picture,
      ]
    );
    res.json(newRide.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

router.post("/attraction-create", authorize, async (req, res) => {
  try {
    const role = req.user.type;
    if (role == "manager") {
      const {
        name,
        description,
        location, //rainedout, new attraction defatult false
        age_restriction,
        picture,
      } = req.body;
      const newAttraction = await pool.query(
        `INSERT INTO attraction (name, 
                                        description, 
                                        location, 
                                        rainedout, 
                                        age_restriction, 
                                        picture) 
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [name, description, location, false, age_restriction, picture]
      );
      res.json(newAttraction.rows[0]);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.log(err);
  }
});

router.put("/ride-edit", authorize, async (req, res) => {
  try {
    const {
      ride_id,
      name,
      description,
      location,
      broken,
      rainedout,
      age_restriction,
      height_restriction,
      picture,
    } = req.body;
    const udpateRide = await pool.query(
      `UPDATE ride SET name = $1,
                            description = $2,
                            location = $3, 
                            broken = $4,
                            rainedout = $5,
                            age_restriction = $6,
                            height_restriction = $7,
                            picture = $8
                    WHERE ride_id = $9`,
      [
        name,
        description,
        location,
        broken,
        rainedout,
        age_restriction,
        height_restriction,
        picture,
        ride_id,
      ]
    );
    res.json("success");
  } catch (err) {
    res.json("error");
    console.log(err);
  }
});

router.put("/attraction-edit", authorize, async (req, res) => {
  try {
    const {
      attraction_id,
      name,
      description,
      location,
      rainedout,
      age_restriction,
      picture,
    } = req.body;
    const udpateAttraction = await pool.query(
      `UPDATE attraction SET name = $1,
                            description = $2,
                            location = $3, 
                            rainedout = $4,
                            age_restriction = $5,
                            picture = $6
                    WHERE attraction_id = $7`,
      [
        name,
        description,
        location,
        rainedout,
        age_restriction,
        picture,
        attraction_id,
      ]
    );
    res.json("success");
  } catch (err) {
    res.json("error");
    console.log(err);
  }
});

router.delete("/ride-delete", authorize, async (req, res) => {
  try {
    const { ride_id } = req.body;
    const deleteRide = await pool.query(`DELETE FROM ride WHERE ride_id = $1`, [
      ride_id,
    ]);
    if (deleteRide.rowCount == 1) {
      res.json("success");
    } else {
      res.json("error");
    }
  } catch (err) {
    console.log(err);
  }
});

router.delete("/attraction-delete", authorize, async (req, res) => {
  try {
    const { attraction_id } = req.body;
    const deleteAttraction = await pool.query(
      `DELETE FROM attraction WHERE attraction_id = $1`,
      [attraction_id]
    );
    if (deleteAttraction.rowCount == 1) {
      res.json("success");
    } else {
      res.json("error");
    }
  } catch (err) {
    res.json("error");
    console.log(err);
  }
});

//The below code is not tested.
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

// router.post("/assign-attendant-attraction", authorize, async (req, res) => {
//     try {
//         const { account_id, attraction_id } = req.body;
//         const newAssign = await pool.query(
//             "INSERT INTO AttendantAssignment (attendant_id, attraction_id) VALUES ($1, $2) RETURNING *",
//             [account_id, attraction_id]
//         );
//         res.json(newAssign.rows[0]);

//     } catch (err) {
//         console.log(err);
//     })

module.exports = router;
