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

/**
 *  Visits on time range
 */

//all the visits based on time range, time format "2021-01-01"
/*
router.get("/report-visits-time-range", async (req, res) => {
  try {
    const { start_date, end_date } = req.body;
    const report = await pool.query(
      "SELECT * FROM ENTRYPASS WHERE time_purchased BETWEEN $1 AND $2",
      [start_date, end_date]
    );

    res.json(report.rows);
  } catch (err) {
    console.log(err);
  }
});
*/

//visit total based on time range, time format "2021-01-01"
router.get("/report-total-visits-time-range", async (req, res) => {
  try {
    const { start_date, end_date } = req.body;
    const report = await pool.query(
      "SELECT count(*) FROM ENTRYPASS WHERE time_purchased BETWEEN $1 AND $2",
      [start_date, end_date]
    );

    res.json(report.rows);
  } catch (err) {
    console.log(err);
  }
});


//visit average based on time range, time format "2021-01-01"
router.get("/report-average-visits-time-range", async (req, res) => {
  try {
    const { start_date, end_date } = req.body;
    const report = await pool.query(
      `SELECT AVG(c) FROM (
        SELECT count(*) AS c FROM ENTRYPASS WHERE time_purchased BETWEEN $1 AND $2) a;`,
      [start_date, end_date]
    );

    res.json(report.rows);
  } catch (err) {
    console.log(err);
  }
});

//visit maximum based on time range, time format "2021-01-01"
router.get("/report-max-visits-time-range", async (req, res) => {
  try {
    const { start_date, end_date } = req.body;
    const report = await pool.query(
      `SELECT count(*) AS max_visits, DATE(time_purchased) AS date
        FROM ENTRYPASS WHERE time_purchased BETWEEN $1 AND $2
        GROUP BY date
        ORDER BY max_visits DESC limit 1;`,
      [start_date, end_date]
    );

    res.json(report.rows);
  } catch (err) {
    console.log(err);
  }
});

//all the visits based on time range, time format "2021-01-01"
router.get("/report-visits-time-range", async (req, res) => {
  try {
    const { start_date, end_date } = req.body;
    const report = await pool.query(
      "SELECT * FROM ENTRYPASS WHERE time_purchased BETWEEN $1 AND $2",
      [start_date, end_date]
    );

    res.json(report.rows);
  } catch (err) {
    console.log(err);
  }
});

/**
 *  Visits based on month
 */

//all the visits based on a certain month
/*
router.get("/report-visits-month", async (req, res) => {
  try {
    const { month, year } = req.body;
    const report = await pool.query(
      "SELECT * FROM ENTRYPASS WHERE EXTRACT(MONTH FROM time_purchased) = $1 AND EXTRACT(YEAR FROM time_purchased)=$2",
      [month, year]
    );

    res.json(report.rows);
  } catch (err) {
    console.log(err);
  }
});
*/

//visit total based on month
router.get("/report-total-visits-month", async (req, res) => {
  try {
    const { month, year } = req.body;
    const report = await pool.query(
      "SELECT count(*) FROM ENTRYPASS WHERE EXTRACT(MONTH FROM time_purchased) = $1 AND EXTRACT(YEAR FROM time_purchased)=$2",
      [month, year]
    );

    res.json(report.rows);
  } catch (err) {
    console.log(err);
  }
});

//visit average based on month

// AVG function not work as expected.
// router.get("/report-average-visits-month", async (req, res) => {
//   try {
//     const { month, year } = req.body;
//     const report = await pool.query(
//       `SELECT AVG(c) FROM (
//         SELECT count(*) as c FROM ENTRYPASS WHERE EXTRACT(MONTH FROM time_purchased) = $1 AND EXTRACT(YEAR FROM time_purchased)=$2) a;`,
//       [month, year]
//     );

//     res.json(report.rows);
//   } catch (err) {
//     console.log(err);
//   }
// });


//visit average based on month, total/(days of the month)
router.get("/report-average-visits-month", async (req, res) => {
  try {
    const { month, year } = req.body;
    //get the days of the month
    const d = new Date(year, month, 0);
    const number_days = d.getDate();
    console.log(number_days);
    const report = await pool.query(
      `SELECT c/$3 as average_visit FROM (
        SELECT count(*) as c FROM ENTRYPASS WHERE EXTRACT(MONTH FROM time_purchased) = $1 AND EXTRACT(YEAR FROM time_purchased)=$2) a;`,
      [month, year, number_days]
    );

    res.json(report.rows);
  } catch (err) {
    console.log(err);
  }
});

//visit maximum based on month, which day in the month most visitors.
router.get("/report-max-visits-month", async (req, res) => {
  try {
    const { month, year } = req.body;
    const report = await pool.query(
      `SELECT count(*) AS max_visits, DATE(time_purchased) AS date
        FROM ENTRYPASS WHERE EXTRACT(MONTH FROM time_purchased) = $1 AND EXTRACT(YEAR FROM time_purchased)=$2
        GROUP BY date
        ORDER BY max_visits DESC limit 1;`,
      [month, year]
    );

    res.json(report.rows);
  } catch (err) {
    console.log(err);
  }
});

/**
 *  Usage Reports
 */
//usage total based on time range, type is ride or attraction
router.get("/report-total-usage-time-range", async (req, res) => {
  try {
    const { type, ride_id, start_date, attraction_id, end_date } = req.body;
    if (type == "ride") {
      const report = await pool.query(
        `SELECT SUM(usage_count) AS total_usage
          FROM rideusage WHERE ride_id=$1
            AND date_used BETWEEN $2 AND $3;`,
        [ride_id, start_date, end_date]
      );
      res.json(report.rows);
    }
    else {
      const report = await pool.query(
        `SELECT SUM(visit_count) AS total_usage
          FROM AttractionVisit WHERE attraction_id=$1
            AND date_visited BETWEEN $2 AND $3;`,
        [attraction_id, start_date, end_date]
      );
      res.json(report.rows);
    }

    //res.json(report.rows);
  } catch (err) {
    console.log(err);
  }
});


//usage daily average usage based on time range
router.get("/report-average-usage-time-range", async (req, res) => {
  try {
    const { type, ride_id, start_date, attraction_id, end_date } = req.body;
    if (type == "ride") {
      const report = await pool.query(
        `SELECT AVG(daily_usage) as average_usage FROM
          (SELECT SUM(usage_count) AS daily_usage, DATE(date_used)
          FROM rideusage WHERE ride_id=$1
          AND date_used BETWEEN $2 AND $3 GROUP BY DATE(date_used)) a;`,
        [ride_id, start_date, end_date]
      );
      res.json(report.rows);
    }
    else {
      const report = await pool.query(
        `SELECT AVG(daily_usage) as average_usage FROM
          (SELECT SUM(visit_count) AS daily_usage, DATE(date_visited)
          FROM AttractionVisit WHERE attraction_id=$1
          AND date_visited BETWEEN $2 AND $3 GROUP BY DATE(date_visited)) a;`,
        [attraction_id, start_date, end_date]
      );
      res.json(report.rows);
    }

    //res.json(report.rows);
  } catch (err) {
    console.log(err);
  }
});

//usage maximum based on time range
router.get("/report-max-usage-time-range", async (req, res) => {
  try {
    const { type, ride_id, start_date, attraction_id, end_date } = req.body;
    if (type == "ride") {
      const report = await pool.query(
        `SELECT SUM(usage_count) AS max_usage, DATE(date_used)
          FROM rideusage WHERE ride_id=$1
          AND date_used BETWEEN $2 AND $3 GROUP BY DATE(date_used)
          ORDER BY max_usage DESC LIMIT 1;`,
        [ride_id, start_date, end_date]
      );
      res.json(report.rows);
    }
    else {
      const report = await pool.query(
        `SELECT SUM(visit_count) AS max_usage, DATE(date_visited)
          FROM AttractionVisit WHERE attraction_id=$1
          AND date_visited BETWEEN $2 AND $3 GROUP BY DATE(date_visited)
          ORDER BY max_usage DESC LIMIT 1;`,
        [attraction_id, start_date, end_date]
      );
      res.json(report.rows);
    }

    //res.json(report.rows);
  } catch (err) {
    console.log(err);
  }
});

/**
 * Usage report base on month.
 */
//visit total based on time range, type is ride or attraction
router.get("/report-total-usage-month", async (req, res) => {
  try {
    const { type, ride_id, attraction_id, month, year } = req.body;
    if (type == "ride") {
      const report = await pool.query(
        `SELECT SUM(usage_count) AS total_usage
          FROM rideusage WHERE ride_id=$1
            AND EXTRACT(MONTH FROM date_used) = $2 
            AND EXTRACT(YEAR FROM date_used)=$3;`,
        [ride_id, month, year]
      );
      res.json(report.rows);
    }
    else {
      const report = await pool.query(
        `SELECT SUM(visit_count) AS total_usage
          FROM AttractionVisit WHERE attraction_id=$1
            AND EXTRACT(MONTH FROM date_visited) = $2
            AND EXTRACT(YEAR FROM date_visited)=$3;`,
        [attraction_id, month, year]
      );
      res.json(report.rows);
    }

    //res.json(report.rows);
  } catch (err) {
    console.log(err);
  }
});


//visit daily average usage based on month

//Avg function based on total/row_numbers, not we want.
// router.get("/report-average-usage-month", async (req, res) => {

//   try {
//     const { type, ride_id, attraction_id, month, year } = req.body;
//     //get the days of the month
//     var d = new Date(year,month,0);
//     console.log(d.getDate());
//     if (type == "ride") {
//       const report = await pool.query(
//         `SELECT AVG(daily_usage) as average_usage FROM
//           (SELECT SUM(usage_count) AS daily_usage, DATE(date_used)
//           FROM rideusage WHERE ride_id=$1
//             AND EXTRACT(MONTH FROM date_used) = $2 
//             AND EXTRACT(YEAR FROM date_used)=$3
//             GROUP BY DATE(date_used)) a;`,
//             [ride_id, month, year]
//       );
//       res.json(report.rows);
//     }
//     else
//     {
//       const report = await pool.query(
//         `SELECT AVG(daily_usage) as average_usage FROM
//           (SELECT SUM(visit_count) AS daily_usage, DATE(date_visited)
//           FROM AttractionVisit WHERE attraction_id=$1
//             AND EXTRACT(MONTH FROM date_visited) = $2
//             AND EXTRACT(YEAR FROM date_visited)=$3
//             GROUP BY DATE(date_visited)) a;`,
//             [attraction_id, month, year]
//       );
//       res.json(report.rows);
//     }

//     //res.json(report.rows);
//   } catch (err) {
//     console.log(err);
//   }
// });


//Avg function based on total/row_numbers, not we want.
router.get("/report-average-usage-month", async (req, res) => {

  try {
    const { type, ride_id, attraction_id, month, year } = req.body;
    //get the days of the month
    const d = new Date(year, month, 0);
    const number_days = d.getDate();
    console.log(number_days);
    if (type == "ride") {
      const report = await pool.query(
        `SELECT (daily_usage/$4) AS average_usage FROM
          (SELECT SUM(usage_count) AS daily_usage
          FROM rideusage WHERE ride_id=$1
            AND EXTRACT(MONTH FROM date_used) = $2 
            AND EXTRACT(YEAR FROM date_used)=$3
            ) a;`,
        [ride_id, month, year, number_days]
      );
      res.json(report.rows);
    }
    else {
      const report = await pool.query(
        `SELECT (daily_usage/$4) as average_usage FROM
          (SELECT SUM(visit_count) AS daily_usage
          FROM AttractionVisit WHERE attraction_id=$1
            AND EXTRACT(MONTH FROM date_visited) = $2
            AND EXTRACT(YEAR FROM date_visited)=$3) a;`,
        [attraction_id, month, year, number_days]
      );
      res.json(report.rows);
    }

    //res.json(report.rows);
  } catch (err) {
    console.log(err);
  }
});

//usage maximum based on month, which day use maximum
router.get("/report-max-usage-month", async (req, res) => {
  try {
    const { type, ride_id, attraction_id, month, year } = req.body;
    if (type == "ride") {
      const report = await pool.query(
        `SELECT SUM(usage_count) AS max_usage, DATE(date_used)
          FROM rideusage WHERE ride_id=$1
            AND EXTRACT(MONTH FROM date_used) = $2
            AND EXTRACT(YEAR FROM date_used)=$3
            GROUP BY DATE(date_used)
            ORDER BY max_usage DESC LIMIT 1;`,
        [ride_id, month, year]
      );
      res.json(report.rows);
    }
    else {
      const report = await pool.query(
        `SELECT SUM(visit_count) AS max_usage, DATE(date_visited)
          FROM AttractionVisit WHERE attraction_id=$1
            AND EXTRACT(MONTH FROM date_visited) = $2
            AND EXTRACT(YEAR FROM date_visited)=$3
            GROUP BY DATE(date_visited)
            ORDER BY max_usage DESC LIMIT 1;`,
        [attraction_id, month, year]
      );
      res.json(report.rows);
    }

    //res.json(report.rows);
  } catch (err) {
    console.log(err);
  }
});

/**
 * Get most popular ride
 */
router.get("/report-popular-month", async (req, res) => {
  try {
    const { type, month, year } = req.body;
    if (type == "ride") {
      const report = await pool.query(
        `SELECT SUM(usage_count) AS max_usage, ride_id
          FROM rideusage WHERE
            EXTRACT(MONTH FROM date_used) = $1
            AND EXTRACT(YEAR FROM date_used)=$2
            GROUP BY ride_id
            ORDER BY max_usage DESC LIMIT 1;`,
        [month, year]
      );
      res.json(report.rows);
    }
    else {
      const report = await pool.query(
        `SELECT SUM(visit_count) AS max_usage, attraction_id
          FROM AttractionVisit WHERE
            EXTRACT(MONTH FROM date_visited) = $1
            AND EXTRACT(YEAR FROM date_visited)=$2
            GROUP BY attraction_id
            ORDER BY max_usage DESC LIMIT 1;`,
        [month, year]
      );
      res.json(report.rows);
    }

    //res.json(report.rows);
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;
