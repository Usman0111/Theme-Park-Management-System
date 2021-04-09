const router = require("express").Router();
const pool = require("../db");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

// Manager Image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname
      //switch to this to rename files before storing
      //file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.post("/upload-image", upload.single("image"), (req, res) => {
  try {
    res.send(req.file);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.post("/delete-image", (req, res) => {
  try {
    const { filename } = req.body;
    fs.unlinkSync(path.resolve(__dirname, "../images/", filename));
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

// Manager Ride
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
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        name,
        description,
        location,
        false,
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

router.put("/ride-edit", async (req, res) => {
  try {
    const {
      ride_id,
      name,
      description,
      location,
      age_restriction,
      height_restriction,
      picture,
    } = req.body;
    const udpateRide = await pool.query(
      `UPDATE ride SET name = $1,
                            description = $2,
                            location = $3, 
                            age_restriction = $4,
                            height_restriction = $5,
                            picture = $6
                    WHERE ride_id = $7`,
      [
        name,
        description,
        location,
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

router.put("/ride-archive", async (req, res) => {
  try {
    const { ride_id, archive } = req.body;
    const archiveRide = await pool.query(
      `UPDATE ride SET archived = $1 WHERE ride_id = $2`,
      [archive, ride_id]
    );
    if (archiveRide.rowCount == 1) {
      res.json("success");
    } else {
      res.json("error");
    }
  } catch (err) {
    console.log(err);
  }
});

// Ride delete needs to delete all foreign reference before deleting ride
// router.delete("/ride-delete", async (req, res) => {
//   try {
//     const { ride_id } = req.body;
//     const deleteRide = await pool.query(
//       `DELETE FROM ride WHERE ride_id = $1 CASCADE`,
//       [ride_id]
//     );
//     if (deleteRide.rowCount == 1) {
//       res.json("success");
//     } else {
//       res.json("error");
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

//Manager Attraction
router.post("/attraction-create", async (req, res) => {
  try {
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
  } catch (err) {
    console.log(err);
  }
});

router.put("/attraction-edit", async (req, res) => {
  try {
    const {
      attraction_id,
      name,
      description,
      location,
      age_restriction,
      picture,
    } = req.body;
    const udpateAttraction = await pool.query(
      `UPDATE attraction SET name = $1,
                            description = $2,
                            location = $3, 
                            age_restriction = $4,
                            picture = $5
                    WHERE attraction_id = $6`,
      [name, description, location, age_restriction, picture, attraction_id]
    );
    res.json("success");
  } catch (err) {
    res.json("error");
    console.log(err);
  }
});

router.put("/attraction-archive", async (req, res) => {
  try {
    const { attraction_id, archive } = req.body;
    const archiveAttraction = await pool.query(
      `UPDATE attraction SET archived = $1 WHERE attraction_id = $2`,
      [archive, attraction_id]
    );
    if (archiveAttraction.rowCount == 1) {
      res.json("success");
    } else {
      res.json("error");
    }
  } catch (err) {
    console.log(err);
  }
});

// need to delete all references first
// router.delete("/attraction-delete", async (req, res) => {
//   try {
//     const { attraction_id } = req.body;
//     const deleteAttraction = await pool.query(
//       `DELETE FROM attraction WHERE attraction_id = $1`,
//       [attraction_id]
//     );
//     if (deleteAttraction.rowCount == 1) {
//       res.json("success");
//     } else {
//       res.json("error");
//     }
//   } catch (err) {
//     res.json("error");
//     console.log(err);
//   }
// });

//Manager Assign
router.get("/unassinged-attendants", async (req, res) => {
  try {
    const unassingedAttendants = await pool.query(
      "SELECT * FROM useraccount WHERE user_type = 'attendant' AND account_id NOT IN (SELECT attendant_id FROM attendantassignment)"
    );

    res.json(unassingedAttendants.rows);
  } catch (err) {
    console.log(err);
  }
});

router.post("/get-one-attendant", async (req, res) => {
  try {
    const { attendant_id } = req.body;

    const attendant = await pool.query(
      "SELECT * from useraccount WHERE account_id = $1",
      [attendant_id]
    );

    res.json(attendant.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

const validAssignmentTypes = ["ride", "attraction"];

router.post("/new-assignment", async (req, res) => {
  try {
    const { assignment_type, attendant_id } = req.body;

    if (!validAssignmentTypes.includes(assignment_type)) {
      return res.status(400).send("Invalid assignment type");
    }

    const alreadyAssinged = await pool.query(
      "SELECT * FROM attendantassignment WHERE attendant_id=$1 AND assignment_type=$2",
      [attendant_id, assignment_type]
    );
    if (alreadyAssinged.rows.length !== 0) {
      return res.json("attendant already assinged");
    }

    const newAssign = await pool.query(
      "INSERT INTO attendantassignment(attendant_id, assignment_type) VALUES ($1, $2) RETURNING *",
      [attendant_id, assignment_type]
    );

    if (assignment_type === "ride") {
      const { ride_id } = req.body;
      const assignRide = await pool.query(
        "UPDATE ride SET attendant_id = $1 WHERE ride_id = $2 RETURNING *",
        [attendant_id, ride_id]
      );
      return res.json(assignRide.rows[0]);
    }

    if (assignment_type === "attraction") {
      const { attraction_id } = req.body;
      const assignAttraction = await pool.query(
        "UPDATE attraction SET attendant_id = $1 WHERE attraction_id = $2 RETURNING *",
        [attendant_id, attraction_id]
      );
      return res.json(assignAttraction.rows[0]);
    }

    res.json("invalid assignment type");
  } catch (err) {
    console.log(err);
  }
});

router.delete("/remove-assignment", async (req, res) => {
  try {
    const { assignment_type, attendant_id } = req.body;

    if (!validAssignmentTypes.includes(assignment_type)) {
      return res.status(400).send("Invalid assignment type");
    }

    const removeAssinged = await pool.query(
      "DELETE FROM attendantassignment WHERE attendant_id=$1 AND assignment_type=$2 RETURNING *",
      [attendant_id, assignment_type]
    );

    if (removeAssinged.rows.length === 0) {
      return res.json("no such assignment");
    }

    if (assignment_type === "ride") {
      const { ride_id } = req.body;
      const assignRide = await pool.query(
        "UPDATE ride SET attendant_id = $1 WHERE ride_id = $2 RETURNING *",
        [null, ride_id]
      );
      return res.json(assignRide.rows[0]);
    }

    if (assignment_type === "attraction") {
      const { attraction_id } = req.body;
      const assignAttraction = await pool.query(
        "UPDATE attraction SET attendant_id = $1 WHERE attraction_id = $2 RETURNING *",
        [null, attraction_id]
      );
      return res.json(assignAttraction.rows[0]);
    }
  } catch (err) {
    console.log(err);
  }
});

//Manager Reports
module.exports = router;
