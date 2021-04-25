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
      //file.originalname
      //switch to this to rename files before storing
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
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

    const current = await pool.query(
      `SELECT * FROM ride WHERE name=$1 AND location=$2`,
      [name, location]
    );

    if (current.rows.length !== 0) {
      return res
        .status(400)
        .send("Ride with same name and location already exists");
    }

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

router.get("/all-maintainence-requests", async (req, res) => {
  try {
    const breakdowns = await pool.query(
      `SELECT * FROM ridebreakdowns, ride, useraccount
                      WHERE fullfilled=false AND ridebreakdowns.ride_id = ride.ride_id AND ride.attendant_id=useraccount.account_id`
    );

    // previous query that doesn't give attendant name, if the ids are not properly assigned then above query won't work
    // const breakdowns = await pool.query(
    //   `SELECT * FROM ridebreakdowns, ride
    //                   WHERE maintainer_id IS NULL AND ridebreakdowns.ride_id = ride.ride_id`
    // );

    res.json(breakdowns.rows);
  } catch (err) {
    console.log(err);
  }
});

router.get("/all-maintainers", async (req, res) => {
  try {
    const maintainers = await pool.query(
      `SELECT * from useraccount where user_type='maintainer' AND account_id>30`
    );

    res.json(maintainers.rows);
  } catch (err) {
    res.status(500).send("server error");
    console.log(err);
  }
});

router.put("/assign-fix", async (req, res) => {
  try {
    const { breakdown_id, maintainer_id } = req.body;

    const updateRequest = await pool.query(
      `UPDATE ridebreakdowns SET maintainer_id=$1 WHERE breakdown_id=$2 RETURNING *`,
      [maintainer_id, breakdown_id]
    );

    res.json(updateRequest.rows[0]);
  } catch (err) {
    res.status(500).send("server error");
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

    const current = await pool.query(
      `SELECT * FROM attraction WHERE name=$1 AND location=$2`,
      [name, location]
    );

    if (current.rows.length !== 0) {
      return res
        .status(400)
        .send("Attraction with same name and location already exists");
    }

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
    const user = await pool.query(
      "SELECT * FROM useraccount WHERE account_id=$1",
      [attendant_id]
    );

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
      return res.json({ ...assignRide.rows[0], ...user.rows[0] });
    }

    if (assignment_type === "attraction") {
      const { attraction_id } = req.body;
      const assignAttraction = await pool.query(
        "UPDATE attraction SET attendant_id = $1 WHERE attraction_id = $2 RETURNING *",
        [attendant_id, attraction_id]
      );
      return res.json({ ...assignAttraction.rows[0], ...user.rows[0] });
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

// Visits(range, daily totals or month 4 vals, price): fake data -> valid customer_id
// - select on date range
// - daily visits (group by day)
// - monthly total, avg, max, min (extract and group by month and year)
router.post("/visits", async (req, res) => {
  try {
    const { start_date, end_date, calculate } = req.body;

    if (calculate === "daily total") {
      const report = await pool.query(
        "SELECT COUNT(entrypass_id) AS visits, EXTRACT(month from time_purchased) AS month, EXTRACT(day from time_purchased) AS day, EXTRACT(year from time_purchased) AS year FROM entrypass WHERE time_purchased BETWEEN $1 and $2 GROUP BY day, month, year ORDER by year, month, day ASC;",
        [start_date, end_date]
      );

      return res.json(report.rows);
    }
    if (calculate === "monthly total") {
      const report = await pool.query(
        "SELECT SUM(daily.visits) AS visits, month, year FROM(SELECT COUNT(entrypass_id) AS visits, EXTRACT(month from time_purchased) AS month, EXTRACT(day from time_purchased) AS day, EXTRACT(year from time_purchased) AS year FROM entrypass WHERE time_purchased BETWEEN $1 and $2 GROUP BY day, month, year) AS daily GROUP BY month, year ORDER BY year, month ASC;",
        [start_date, end_date]
      );

      return res.json(report.rows);
    }
    if (calculate === "daily average by month") {
      const report = await pool.query(
        "SELECT AVG(daily.visits) AS visits, month, year FROM(SELECT COUNT(entrypass_id) AS visits, EXTRACT(month from time_purchased) AS month, EXTRACT(day from time_purchased) AS day, EXTRACT(year from time_purchased) AS year FROM entrypass WHERE time_purchased BETWEEN $1 and $2 GROUP BY day, month, year) AS daily GROUP BY month, year ORDER BY year, month ASC;",
        [start_date, end_date]
      );

      return res.json(report.rows);
    }
    if (calculate === "daily max by month") {
      const report = await pool.query(
        "SELECT MAX(daily.visits) AS visits, month, year FROM(SELECT COUNT(entrypass_id) AS visits, EXTRACT(month from time_purchased) AS month, EXTRACT(day from time_purchased) AS day, EXTRACT(year from time_purchased) AS year FROM entrypass WHERE time_purchased BETWEEN $1 and $2 GROUP BY day, month, year) AS daily GROUP BY month, year ORDER BY year, month ASC;",
        [start_date, end_date]
      );

      return res.json(report.rows);
    }
    if (calculate === "daily min by month") {
      const report = await pool.query(
        "SELECT MIN(daily.visits) AS visits, month, year FROM(SELECT COUNT(entrypass_id) AS visits, EXTRACT(month from time_purchased) AS month, EXTRACT(day from time_purchased) AS day, EXTRACT(year from time_purchased) AS year FROM entrypass WHERE time_purchased BETWEEN $1 and $2 GROUP BY day, month, year) AS daily GROUP BY month, year ORDER BY year, month ASC;",
        [start_date, end_date]
      );

      return res.json(report.rows);
    }

    res.status(400).send("Incorrect fields provided");
  } catch (err) {
    res.status(500).send("Server Error while generating reports");
    console.log(err);
  }
});

// Usage(range, type, all or one, daily totals or month 4 vals): fake data -> valid customer_id, ride_id/attraction_id
// - select on date range and type of table
// - group by day and ride/attraction (all or one)
// - daily visits (group by day)
// - monthly total, avg, max, min (extract and group by month and year)
router.post("/usage", async (req, res) => {
  try {
    const { start_date, end_date, type, calculate, show } = req.body;

    if (type === "ride") {
      if (show === "all") {
        if (calculate === "daily total") {
          const report = await pool.query(
            "SELECT name, SUM(usage_count) AS usage, EXTRACT(month from date_used) AS month, EXTRACT(day from date_used) AS day, EXTRACT(year from date_used) AS year FROM rideusage, ride WHERE date_used BETWEEN $1 and $2 AND rideusage.ride_id = ride.ride_id GROUP BY ride.name, day, month, year ORDER BY year, month, day ASC;",
            [start_date, end_date]
          );

          return res.json(report.rows);
        }
        if (calculate === "monthly total") {
          const report = await pool.query(
            "SELECT name, SUM(usage_count) AS usage , EXTRACT(month from date_used) AS month, EXTRACT(year from date_used) AS year FROM rideusage, ride WHERE date_used BETWEEN $1 and $2 AND rideusage.ride_id = ride.ride_id GROUP BY ride.name, month, year ORDER by year, month ASC;",
            [start_date, end_date]
          );

          return res.json(report.rows);
        }
        if (calculate === "daily average by month") {
          const report = await pool.query(
            "SELECT name, AVG(daily.usage) AS usage, month, year FROM (SELECT name, EXTRACT(month from date_used) AS month, EXTRACT(day from date_used) AS day, EXTRACT(year from date_used) AS year, SUM(usage_count) AS usage FROM rideusage, ride WHERE date_used BETWEEN $1 and $2 AND rideusage.ride_id = ride.ride_id GROUP BY ride.name, day, month, year) AS daily GROUP BY name, month, year ORDER by year, month ASC;",
            [start_date, end_date]
          );

          return res.json(report.rows);
        }
        if (calculate === "daily max by month") {
          const report = await pool.query(
            "SELECT name, MAX(daily.usage) AS usage, month, year FROM (SELECT name, EXTRACT(month from date_used) AS month, EXTRACT(day from date_used) AS day, EXTRACT(year from date_used) AS year, SUM(usage_count) AS usage FROM rideusage, ride WHERE date_used BETWEEN $1 and $2 AND rideusage.ride_id = ride.ride_id GROUP BY ride.name, day, month, year) AS daily GROUP BY name, month, year ORDER by year, month ASC;",
            [start_date, end_date]
          );

          return res.json(report.rows);
        }
        if (calculate === "daily min by month") {
          const report = await pool.query(
            "SELECT name, MIN(daily.usage) AS usage, month, year FROM (SELECT name, EXTRACT(month from date_used) AS month, EXTRACT(day from date_used) AS day, EXTRACT(year from date_used) AS year, SUM(usage_count) AS usage FROM rideusage, ride WHERE date_used BETWEEN $1 and $2 AND rideusage.ride_id = ride.ride_id GROUP BY ride.name, day, month, year) AS daily GROUP BY name, month, year ORDER by year, month ASC;",
            [start_date, end_date]
          );
          return res.json(report.rows);
        }
      }

      if (show === "one") {
        const { ride_id } = req.body;
        if (calculate === "daily total") {
          const report = await pool.query(
            "SELECT  SUM(usage_count) AS usage, EXTRACT(month from date_used) AS month, EXTRACT(day from date_used) AS day, EXTRACT(year from date_used) AS year FROM rideusage WHERE date_used BETWEEN $1 and $2 AND rideusage.ride_id = $3 GROUP BY day, month, year ORDER BY year, month, day ASC;",
            [start_date, end_date, ride_id]
          );

          return res.json(report.rows);
        }
        if (calculate === "monthly total") {
          const report = await pool.query(
            "SELECT SUM(usage_count) AS usage , EXTRACT(month from date_used) AS month, EXTRACT(year from date_used) AS year FROM rideusage WHERE date_used BETWEEN $1 and $2 AND rideusage.ride_id = $3 GROUP BY month, year ORDER by year, month ASC;",
            [start_date, end_date, ride_id]
          );

          return res.json(report.rows);
        }
        if (calculate === "daily average by month") {
          const report = await pool.query(
            "SELECT AVG(daily.usage) AS usage, month, year FROM (SELECT EXTRACT(month from date_used) AS month, EXTRACT(day from date_used) AS day, EXTRACT(year from date_used) AS year, SUM(usage_count) AS usage FROM rideusage WHERE date_used BETWEEN $1 and $2 AND rideusage.ride_id = $3 GROUP BY day, month, year) AS daily GROUP BY month, year ORDER by year, month ASC;",
            [start_date, end_date, ride_id]
          );

          return res.json(report.rows);
        }
        if (calculate === "daily max by month") {
          const report = await pool.query(
            "SELECT MAX(daily.usage) AS usage, month, year FROM (SELECT EXTRACT(month from date_used) AS month, EXTRACT(day from date_used) AS day, EXTRACT(year from date_used) AS year, SUM(usage_count) AS usage FROM rideusage WHERE date_used BETWEEN $1 and $2 AND rideusage.ride_id = $3 GROUP BY day, month, year) AS daily GROUP BY month, year ORDER by year, month ASC;",
            [start_date, end_date, ride_id]
          );

          return res.json(report.rows);
        }
        if (calculate === "daily min by month") {
          const report = await pool.query(
            "SELECT MIN(daily.usage) AS usage, month, year FROM (SELECT EXTRACT(month from date_used) AS month, EXTRACT(day from date_used) AS day, EXTRACT(year from date_used) AS year, SUM(usage_count) AS usage FROM rideusage WHERE date_used BETWEEN $1 and $2 AND rideusage.ride_id = $3 GROUP BY day, month, year) AS daily GROUP BY month, year ORDER by year, month ASC;",
            [start_date, end_date, ride_id]
          );
          return res.json(report.rows);
        }
      }
    }

    if (type === "attraction") {
      if (show === "all") {
        if (calculate === "daily total") {
          const report = await pool.query(
            "SELECT name, SUM(visit_count) AS visit, EXTRACT(month from date_visited) AS month, EXTRACT(day from date_visited) AS day, EXTRACT(year from date_visited) AS year FROM attractionvisit, attraction WHERE date_visited BETWEEN $1 and $2 AND attractionvisit.attraction_id = attraction.attraction_id GROUP BY attraction.name, day, month, year ORDER BY year, month, day ASC;",
            [start_date, end_date]
          );

          return res.json(report.rows);
        }
        if (calculate === "monthly total") {
          const report = await pool.query(
            "SELECT name, SUM(visit_count) AS visit , EXTRACT(month from date_visited) AS month, EXTRACT(year from date_visited) AS year FROM attractionvisit, attraction WHERE date_visited BETWEEN $1 and $2 AND attractionvisit.attraction_id = attraction.attraction_id GROUP BY attraction.name, month, year ORDER by year, month ASC;",
            [start_date, end_date]
          );

          return res.json(report.rows);
        }
        if (calculate === "daily average by month") {
          const report = await pool.query(
            "SELECT name, AVG(daily.visit) AS visit, month, year FROM (SELECT name, EXTRACT(month from date_visited) AS month, EXTRACT(day from date_visited) AS day, EXTRACT(year from date_visited) AS year, SUM(visit_count) AS visit FROM attractionvisit, attraction WHERE date_visited BETWEEN $1 and $2 AND attractionvisit.attraction_id = attraction.attraction_id GROUP BY attraction.name, day, month, year) AS daily GROUP BY name, month, year ORDER by year, month ASC;",
            [start_date, end_date]
          );

          return res.json(report.rows);
        }
        if (calculate === "daily max by month") {
          const report = await pool.query(
            "SELECT name, MAX(daily.visit) AS visit, month, year FROM (SELECT name, EXTRACT(month from date_visited) AS month, EXTRACT(day from date_visited) AS day, EXTRACT(year from date_visited) AS year, SUM(visit_count) AS visit FROM attractionvisit, attraction WHERE date_visited BETWEEN $1 and $2 AND attractionvisit.attraction_id = attraction.attraction_id GROUP BY attraction.name, day, month, year) AS daily GROUP BY name, month, year ORDER by year, month ASC;",
            [start_date, end_date]
          );

          return res.json(report.rows);
        }
        if (calculate === "daily min by month") {
          const report = await pool.query(
            "SELECT name, MIN(daily.visit) AS visit, month, year FROM (SELECT name, EXTRACT(month from date_visited) AS month, EXTRACT(day from date_visited) AS day, EXTRACT(year from date_visited) AS year, SUM(visit_count) AS visit FROM attractionvisit, attraction WHERE date_visited BETWEEN $1 and $2 AND attractionvisit.attraction_id = attraction.attraction_id GROUP BY attraction.name, day, month, year) AS daily GROUP BY name, month, year ORDER by year, month ASC;",
            [start_date, end_date]
          );
          return res.json(report.rows);
        }
      }

      if (show === "one") {
        const { attraction_id } = req.body;
        if (calculate === "daily total") {
          const report = await pool.query(
            "SELECT  SUM(visit_count) AS visit, EXTRACT(month from date_visited) AS month, EXTRACT(day from date_visited) AS day, EXTRACT(year from date_visited) AS year FROM attractionvisit WHERE date_visited BETWEEN $1 and $2 AND attractionvisit.attraction_id = $3 GROUP BY day, month, year ORDER BY year, month, day ASC;",
            [start_date, end_date, attraction_id]
          );

          return res.json(report.rows);
        }
        if (calculate === "monthly total") {
          const report = await pool.query(
            "SELECT SUM(visit_count) AS visit , EXTRACT(month from date_visited) AS month, EXTRACT(year from date_visited) AS year FROM attractionvisit WHERE date_visited BETWEEN $1 and $2 AND attractionvisit.attraction_id = $3 GROUP BY month, year ORDER by year, month ASC;",
            [start_date, end_date, attraction_id]
          );

          return res.json(report.rows);
        }
        if (calculate === "daily average by month") {
          const report = await pool.query(
            "SELECT AVG(daily.visit) AS visit, month, year FROM (SELECT EXTRACT(month from date_visited) AS month, EXTRACT(day from date_visited) AS day, EXTRACT(year from date_visited) AS year, SUM(visit_count) AS visit FROM attractionvisit WHERE date_visited BETWEEN $1 and $2 AND attractionvisit.attraction_id = $3 GROUP BY day, month, year) AS daily GROUP BY month, year ORDER by year, month ASC;",
            [start_date, end_date, attraction_id]
          );

          return res.json(report.rows);
        }
        if (calculate === "daily max by month") {
          const report = await pool.query(
            "SELECT MAX(daily.visit) AS visit, month, year FROM (SELECT EXTRACT(month from date_visited) AS month, EXTRACT(day from date_visited) AS day, EXTRACT(year from date_visited) AS year, SUM(visit_count) AS visit FROM attractionvisit WHERE date_visited BETWEEN $1 and $2 AND attractionvisit.attraction_id = $3 GROUP BY day, month, year) AS daily GROUP BY month, year ORDER by year, month ASC;",
            [start_date, end_date, attraction_id]
          );

          return res.json(report.rows);
        }
        if (calculate === "daily min by month") {
          const report = await pool.query(
            "SELECT MIN(daily.visit) AS visit, month, year FROM (SELECT EXTRACT(month from date_visited) AS month, EXTRACT(day from date_visited) AS day, EXTRACT(year from date_visited) AS year, SUM(visit_count) AS visit FROM attractionvisit WHERE date_visited BETWEEN $1 and $2 AND attractionvisit.attraction_id = $3 GROUP BY day, month, year) AS daily GROUP BY month, year ORDER by year, month ASC;",
            [start_date, end_date, attraction_id]
          );
          return res.json(report.rows);
        }
      }
    }

    res.status(400).send("Incorrect fields provided");
  } catch (err) {
    res.status(500).send("Server Error while generating reports");
    console.log(err);
  }
});

// Breakdowns(range, all or one or by maintainer, daily totals or month 4 vals): fake data -> valid attedant_id, ride_id, maintainer_id
// - select on date range
// - group by day and ride (all or one)
// - daily visits (group by day)
// - monthly total, avg, max, min (extract and group by month and year)
router.post("/breakdowns", async (req, res) => {
  try {
    const { start_date, end_date, calculate, show } = req.body;

    if (show === "all") {
      if (calculate === "daily total") {
        const report = await pool.query(
          "SELECT name, COUNT(breakdown_id) AS breakdowns, EXTRACT(month from breakdown_date) AS month, EXTRACT(day from  breakdown_date) AS day, EXTRACT(year from breakdown_date) AS year FROM ridebreakdowns, ride WHERE breakdown_date BETWEEN $1 and $2 AND ridebreakdowns.ride_id = ride.ride_id GROUP BY name, day, month, year ORDER by year, month, day ASC",
          [start_date, end_date]
        );

        return res.json(report.rows);
      }
      if (calculate === "monthly total") {
        const report = await pool.query(
          "SELECT name, SUM(daily.breakdowns) AS breakdowns, month, year FROM (SELECT name, COUNT(breakdown_id) AS breakdowns, EXTRACT(month from breakdown_date) AS month, EXTRACT(day from  breakdown_date) AS day, EXTRACT(year from breakdown_date) AS year FROM ridebreakdowns, ride WHERE breakdown_date BETWEEN $1 and $2 AND ridebreakdowns.ride_id = ride.ride_id GROUP BY name, day, month, year) AS daily  GROUP BY name, month, year  ORDER by year, month ASC",
          [start_date, end_date]
        );

        return res.json(report.rows);
      }
      if (calculate === "daily average by month") {
        const report = await pool.query(
          "SELECT name, AVG(daily.breakdowns) AS breakdowns, month, year FROM (SELECT name, COUNT(breakdown_id) AS breakdowns, EXTRACT(month from breakdown_date) AS month, EXTRACT(day from  breakdown_date) AS day, EXTRACT(year from breakdown_date) AS year FROM ridebreakdowns, ride WHERE breakdown_date BETWEEN $1 and $2 AND ridebreakdowns.ride_id = ride.ride_id GROUP BY name, day, month, year) AS daily  GROUP BY name, month, year  ORDER by year, month ASC",
          [start_date, end_date]
        );

        return res.json(report.rows);
      }
      if (calculate === "daily max by month") {
        const report = await pool.query(
          "SELECT name, MAX(daily.breakdowns) AS breakdowns, month, year FROM (SELECT name, COUNT(breakdown_id) AS breakdowns, EXTRACT(month from breakdown_date) AS month, EXTRACT(day from  breakdown_date) AS day, EXTRACT(year from breakdown_date) AS year FROM ridebreakdowns, ride WHERE breakdown_date BETWEEN $1 and $2 AND ridebreakdowns.ride_id = ride.ride_id GROUP BY name, day, month, year) AS daily  GROUP BY name, month, year  ORDER by year, month ASC;",
          [start_date, end_date]
        );

        return res.json(report.rows);
      }
      if (calculate === "daily min by month") {
        const report = await pool.query(
          "SELECT name, MIN(daily.breakdowns) AS breakdowns, month, year FROM (SELECT name, COUNT(breakdown_id) AS breakdowns, EXTRACT(month from breakdown_date) AS month, EXTRACT(day from  breakdown_date) AS day, EXTRACT(year from breakdown_date) AS year FROM ridebreakdowns, ride WHERE breakdown_date BETWEEN $1 and $2 AND ridebreakdowns.ride_id = ride.ride_id GROUP BY name, day, month, year) AS daily  GROUP BY name, month, year  ORDER by year, month ASC;",
          [start_date, end_date]
        );
        return res.json(report.rows);
      }
    }

    if (show === "one") {
      const { ride_id } = req.body;
      if (calculate === "daily total") {
        const report = await pool.query(
          "SELECT COUNT(breakdown_id) AS breakdowns, EXTRACT(month from breakdown_date) AS month, EXTRACT(day from  breakdown_date) AS day, EXTRACT(year from breakdown_date) AS year FROM ridebreakdowns, ride WHERE breakdown_date BETWEEN $1 and $2 AND ridebreakdowns.ride_id = $3 GROUP BY day, month, year ORDER by year, month, day ASC;",
          [start_date, end_date, ride_id]
        );

        return res.json(report.rows);
      }
      if (calculate === "monthly total") {
        const report = await pool.query(
          "SELECT SUM(daily.breakdowns) AS breakdowns, month, year FROM (SELECT COUNT(breakdown_id) AS breakdowns, EXTRACT(month from breakdown_date) AS month, EXTRACT(day from  breakdown_date) AS day, EXTRACT(year from breakdown_date) AS year FROM ridebreakdowns, ride WHERE breakdown_date BETWEEN $1 and $2 AND ridebreakdowns.ride_id = $3 GROUP BY day, month, year ORDER by year, month, day ASC) AS daily  GROUP BY month, year  ORDER by year, month ASC;",
          [start_date, end_date, ride_id]
        );

        return res.json(report.rows);
      }
      if (calculate === "daily average by month") {
        const report = await pool.query(
          "SELECT AVG(daily.breakdowns) AS breakdowns, month, year FROM (SELECT COUNT(breakdown_id) AS breakdowns, EXTRACT(month from breakdown_date) AS month, EXTRACT(day from  breakdown_date) AS day, EXTRACT(year from breakdown_date) AS year FROM ridebreakdowns, ride WHERE breakdown_date BETWEEN $1 and $2 AND ridebreakdowns.ride_id = $3 GROUP BY day, month, year ORDER by year, month, day ASC) AS daily  GROUP BY month, year  ORDER by year, month ASC;",
          [start_date, end_date, ride_id]
        );

        return res.json(report.rows);
      }
      if (calculate === "daily max by month") {
        const report = await pool.query(
          "SELECT MAX(daily.breakdowns) AS breakdowns, month, year FROM (SELECT COUNT(breakdown_id) AS breakdowns, EXTRACT(month from breakdown_date) AS month, EXTRACT(day from  breakdown_date) AS day, EXTRACT(year from breakdown_date) AS year FROM ridebreakdowns, ride WHERE breakdown_date BETWEEN $1 and $2 AND ridebreakdowns.ride_id = $3 GROUP BY day, month, year ORDER by year, month, day ASC) AS daily  GROUP BY month, year  ORDER by year, month ASC;",
          [start_date, end_date, ride_id]
        );

        return res.json(report.rows);
      }
      if (calculate === "daily min by month") {
        const report = await pool.query(
          "SELECT MIN(daily.breakdowns) AS breakdowns, month, year FROM (SELECT COUNT(breakdown_id) AS breakdowns, EXTRACT(month from breakdown_date) AS month, EXTRACT(day from  breakdown_date) AS day, EXTRACT(year from breakdown_date) AS year FROM ridebreakdowns, ride WHERE breakdown_date BETWEEN $1 and $2 AND ridebreakdowns.ride_id = $3 GROUP BY day, month, year ORDER by year, month, day ASC) AS daily  GROUP BY month, year  ORDER by year, month ASC;",
          [start_date, end_date, ride_id]
        );
        return res.json(report.rows);
      }
    }

    res.status(400).send("Incorrect fields provided");
  } catch (err) {
    res.status(500).send("Server Error while generating reports");
    console.log(err);
  }
});

// Rainouts(range, type, all or one, daily totals or month 4 vals): fake data -> valid attedant_id, ride_id/attraction_id
// - select on date range and type of table
// - group by day and ride/attraction (all or one)
// - daily visits (group by day)
// - monthly total, avg, max, min (extract and group by month and year)
router.post("/rainouts", async (req, res) => {
  try {
    const { start_date, end_date, type, calculate, show } = req.body;

    if (type === "ride") {
      if (show === "all") {
        if (calculate === "daily total") {
          const report = await pool.query(
            "SELECT name, COUNT(rainout_id) AS rainouts, EXTRACT(month from date_rainedout) AS month, EXTRACT(day from  date_rainedout) AS day, EXTRACT(year from date_rainedout) AS year FROM riderainout, ride WHERE date_rainedout BETWEEN $1 and $2 AND riderainout.ride_id = ride.ride_id GROUP BY name, day, month, year ORDER by year, month, day ASC",
            [start_date, end_date]
          );

          return res.json(report.rows);
        }
        if (calculate === "monthly total") {
          const report = await pool.query(
            "SELECT name, SUM(daily.rainouts) AS rainouts, month, year FROM (SELECT name, COUNT(rainout_id) AS rainouts, EXTRACT(month from date_rainedout) AS month, EXTRACT(day from  date_rainedout) AS day, EXTRACT(year from date_rainedout) AS year FROM riderainout, ride WHERE date_rainedout BETWEEN $1 and $2 AND riderainout.ride_id = ride.ride_id GROUP BY name, day, month, year) AS daily  GROUP BY name, month, year  ORDER by year, month ASC",
            [start_date, end_date]
          );

          return res.json(report.rows);
        }
        if (calculate === "daily average by month") {
          const report = await pool.query(
            "SELECT name, AVG(daily.rainouts) AS rainouts, month, year FROM (SELECT name, COUNT(rainout_id) AS rainouts, EXTRACT(month from date_rainedout) AS month, EXTRACT(day from  date_rainedout) AS day, EXTRACT(year from date_rainedout) AS year FROM riderainout, ride WHERE date_rainedout BETWEEN $1 and $2 AND riderainout.ride_id = ride.ride_id GROUP BY name, day, month, year) AS daily  GROUP BY name, month, year  ORDER by year, month ASC",
            [start_date, end_date]
          );

          return res.json(report.rows);
        }
        if (calculate === "daily max by month") {
          const report = await pool.query(
            "SELECT name, MAX(daily.rainouts) AS rainouts, month, year FROM (SELECT name, COUNT(rainout_id) AS rainouts, EXTRACT(month from date_rainedout) AS month, EXTRACT(day from  date_rainedout) AS day, EXTRACT(year from date_rainedout) AS year FROM riderainout, ride WHERE date_rainedout BETWEEN $1 and $2 AND riderainout.ride_id = ride.ride_id GROUP BY name, day, month, year) AS daily  GROUP BY name, month, year  ORDER by year, month ASC;",
            [start_date, end_date]
          );

          return res.json(report.rows);
        }
        if (calculate === "daily min by month") {
          const report = await pool.query(
            "SELECT name, MIN(daily.rainouts) AS rainouts, month, year FROM (SELECT name, COUNT(rainout_id) AS rainouts, EXTRACT(month from date_rainedout) AS month, EXTRACT(day from  date_rainedout) AS day, EXTRACT(year from date_rainedout) AS year FROM riderainout, ride WHERE date_rainedout BETWEEN $1 and $2 AND riderainout.ride_id = ride.ride_id GROUP BY name, day, month, year) AS daily  GROUP BY name, month, year  ORDER by year, month ASC;",
            [start_date, end_date]
          );
          return res.json(report.rows);
        }
      }

      if (show === "one") {
        const { ride_id } = req.body;
        if (calculate === "daily total") {
          const report = await pool.query(
            "SELECT COUNT(rainout_id) AS rainouts, EXTRACT(month from date_rainedout) AS month, EXTRACT(day from  date_rainedout) AS day, EXTRACT(year from date_rainedout) AS year FROM riderainout, ride WHERE date_rainedout BETWEEN $1 and $2 AND riderainout.ride_id = $3 GROUP BY day, month, year ORDER by year, month, day ASC;",
            [start_date, end_date, ride_id]
          );

          return res.json(report.rows);
        }
        if (calculate === "monthly total") {
          const report = await pool.query(
            "SELECT SUM(daily.rainouts) AS rainouts, month, year FROM (SELECT COUNT(rainout_id) AS rainouts, EXTRACT(month from date_rainedout) AS month, EXTRACT(day from  date_rainedout) AS day, EXTRACT(year from date_rainedout) AS year FROM riderainout, ride WHERE date_rainedout BETWEEN $1 and $2 AND riderainout.ride_id = $3 GROUP BY day, month, year ORDER by year, month, day ASC) AS daily  GROUP BY month, year  ORDER by year, month ASC;",
            [start_date, end_date, ride_id]
          );

          return res.json(report.rows);
        }
        if (calculate === "daily average by month") {
          const report = await pool.query(
            "SELECT AVG(daily.rainouts) AS rainouts, month, year FROM (SELECT COUNT(rainout_id) AS rainouts, EXTRACT(month from date_rainedout) AS month, EXTRACT(day from  date_rainedout) AS day, EXTRACT(year from date_rainedout) AS year FROM riderainout, ride WHERE date_rainedout BETWEEN $1 and $2 AND riderainout.ride_id = $3 GROUP BY day, month, year ORDER by year, month, day ASC) AS daily  GROUP BY month, year  ORDER by year, month ASC;",
            [start_date, end_date, ride_id]
          );

          return res.json(report.rows);
        }
        if (calculate === "daily max by month") {
          const report = await pool.query(
            "SELECT MAX(daily.rainouts) AS rainouts, month, year FROM (SELECT COUNT(rainout_id) AS rainouts, EXTRACT(month from date_rainedout) AS month, EXTRACT(day from  date_rainedout) AS day, EXTRACT(year from date_rainedout) AS year FROM riderainout, ride WHERE date_rainedout BETWEEN $1 and $2 AND riderainout.ride_id = $3 GROUP BY day, month, year ORDER by year, month, day ASC) AS daily  GROUP BY month, year  ORDER by year, month ASC;",
            [start_date, end_date, ride_id]
          );

          return res.json(report.rows);
        }
        if (calculate === "daily min by month") {
          const report = await pool.query(
            "SELECT MIN(daily.rainouts) AS rainouts, month, year FROM (SELECT COUNT(rainout_id) AS rainouts, EXTRACT(month from date_rainedout) AS month, EXTRACT(day from  date_rainedout) AS day, EXTRACT(year from date_rainedout) AS year FROM riderainout, ride WHERE date_rainedout BETWEEN $1 and $2 AND riderainout.ride_id = $3 GROUP BY day, month, year ORDER by year, month, day ASC) AS daily  GROUP BY month, year  ORDER by year, month ASC;",
            [start_date, end_date, ride_id]
          );
          return res.json(report.rows);
        }
      }
    }

    if (type === "attraction") {
      if (show === "all") {
        if (calculate === "daily total") {
          const report = await pool.query(
            "SELECT name, COUNT(rainout_id) AS rainouts, EXTRACT(month from date_rainedout) AS month, EXTRACT(day from  date_rainedout) AS day, EXTRACT(year from date_rainedout) AS year FROM attractionrainout, attraction WHERE date_rainedout BETWEEN $1 and $2 AND attractionrainout.attraction_id = attraction.attraction_id GROUP BY name, day, month, year ORDER by year, month, day ASC",
            [start_date, end_date]
          );

          return res.json(report.rows);
        }
        if (calculate === "monthly total") {
          const report = await pool.query(
            "SELECT name, SUM(daily.rainouts) AS rainouts, month, year FROM (SELECT name, COUNT(rainout_id) AS rainouts, EXTRACT(month from date_rainedout) AS month, EXTRACT(day from  date_rainedout) AS day, EXTRACT(year from date_rainedout) AS year FROM attractionrainout, attraction WHERE date_rainedout BETWEEN $1 and $2 AND attractionrainout.attraction_id = attraction.attraction_id GROUP BY name, day, month, year) AS daily  GROUP BY name, month, year  ORDER by year, month ASC",
            [start_date, end_date]
          );

          return res.json(report.rows);
        }
        if (calculate === "daily average by month") {
          const report = await pool.query(
            "SELECT name, AVG(daily.rainouts) AS rainouts, month, year FROM (SELECT name, COUNT(rainout_id) AS rainouts, EXTRACT(month from date_rainedout) AS month, EXTRACT(day from  date_rainedout) AS day, EXTRACT(year from date_rainedout) AS year FROM attractionrainout, attraction WHERE date_rainedout BETWEEN $1 and $2 AND attractionrainout.attraction_id = attraction.attraction_id GROUP BY name, day, month, year) AS daily  GROUP BY name, month, year  ORDER by year, month ASC",
            [start_date, end_date]
          );

          return res.json(report.rows);
        }
        if (calculate === "daily max by month") {
          const report = await pool.query(
            "SELECT name, MAX(daily.rainouts) AS rainouts, month, year FROM (SELECT name, COUNT(rainout_id) AS rainouts, EXTRACT(month from date_rainedout) AS month, EXTRACT(day from  date_rainedout) AS day, EXTRACT(year from date_rainedout) AS year FROM attractionrainout, attraction WHERE date_rainedout BETWEEN $1 and $2 AND attractionrainout.attraction_id = attraction.attraction_id GROUP BY name, day, month, year) AS daily  GROUP BY name, month, year  ORDER by year, month ASC;",
            [start_date, end_date]
          );

          return res.json(report.rows);
        }
        if (calculate === "daily min by month") {
          const report = await pool.query(
            "SELECT name, MIN(daily.rainouts) AS rainouts, month, year FROM (SELECT name, COUNT(rainout_id) AS rainouts, EXTRACT(month from date_rainedout) AS month, EXTRACT(day from  date_rainedout) AS day, EXTRACT(year from date_rainedout) AS year FROM attractionrainout, attraction WHERE date_rainedout BETWEEN $1 and $2 AND attractionrainout.attraction_id = attraction.attraction_id GROUP BY name, day, month, year) AS daily  GROUP BY name, month, year  ORDER by year, month ASC;",
            [start_date, end_date]
          );
          return res.json(report.rows);
        }
      }

      if (show === "one") {
        const { attraction_id } = req.body;
        if (calculate === "daily total") {
          const report = await pool.query(
            "SELECT COUNT(rainout_id) AS rainouts, EXTRACT(month from date_rainedout) AS month, EXTRACT(day from  date_rainedout) AS day, EXTRACT(year from date_rainedout) AS year FROM attractionrainout, attraction WHERE date_rainedout BETWEEN $1 and $2 AND attractionrainout.attraction_id = $3 GROUP BY day, month, year ORDER by year, month, day ASC;",
            [start_date, end_date, attraction_id]
          );

          return res.json(report.rows);
        }
        if (calculate === "monthly total") {
          const report = await pool.query(
            "SELECT SUM(daily.rainouts) AS rainouts, month, year FROM (SELECT COUNT(rainout_id) AS rainouts, EXTRACT(month from date_rainedout) AS month, EXTRACT(day from  date_rainedout) AS day, EXTRACT(year from date_rainedout) AS year FROM attractionrainout, attraction WHERE date_rainedout BETWEEN $1 and $2 AND attractionrainout.attraction_id = $3 GROUP BY day, month, year ORDER by year, month, day ASC) AS daily  GROUP BY month, year  ORDER by year, month ASC;",
            [start_date, end_date, attraction_id]
          );

          return res.json(report.rows);
        }
        if (calculate === "daily average by month") {
          const report = await pool.query(
            "SELECT AVG(daily.rainouts) AS rainouts, month, year FROM (SELECT COUNT(rainout_id) AS rainouts, EXTRACT(month from date_rainedout) AS month, EXTRACT(day from  date_rainedout) AS day, EXTRACT(year from date_rainedout) AS year FROM attractionrainout, attraction WHERE date_rainedout BETWEEN $1 and $2 AND attractionrainout.attraction_id = $3 GROUP BY day, month, year ORDER by year, month, day ASC) AS daily  GROUP BY month, year  ORDER by year, month ASC;",
            [start_date, end_date, attraction_id]
          );

          return res.json(report.rows);
        }
        if (calculate === "daily max by month") {
          const report = await pool.query(
            "SELECT MAX(daily.rainouts) AS rainouts, month, year FROM (SELECT COUNT(rainout_id) AS rainouts, EXTRACT(month from date_rainedout) AS month, EXTRACT(day from  date_rainedout) AS day, EXTRACT(year from date_rainedout) AS year FROM attractionrainout, attraction WHERE date_rainedout BETWEEN $1 and $2 AND attractionrainout.attraction_id = $3 GROUP BY day, month, year ORDER by year, month, day ASC) AS daily  GROUP BY month, year  ORDER by year, month ASC;",
            [start_date, end_date, attraction_id]
          );

          return res.json(report.rows);
        }
        if (calculate === "daily min by month") {
          const report = await pool.query(
            "SELECT MIN(daily.rainouts) AS rainouts, month, year FROM (SELECT COUNT(rainout_id) AS rainouts, EXTRACT(month from date_rainedout) AS month, EXTRACT(day from  date_rainedout) AS day, EXTRACT(year from date_rainedout) AS year FROM attractionrainout, attraction WHERE date_rainedout BETWEEN $1 and $2 AND attractionrainout.attraction_id = $3 GROUP BY day, month, year ORDER by year, month, day ASC) AS daily  GROUP BY month, year  ORDER by year, month ASC;",
            [start_date, end_date, attraction_id]
          );
          return res.json(report.rows);
        }
      }
    }

    res.status(400).send("Incorrect fields provided");
  } catch (err) {
    res.status(500).send("Server Error while generating reports");
    console.log(err);
  }
});

module.exports = router;
