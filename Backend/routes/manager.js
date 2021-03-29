const router = require("express").Router();
const pool = require("../db");
const authorize = require("../middleware/authorize");

//get all rides
router.get("/ride-all", async (req, res) => {
    try {
        const rides = await pool.query("SELECT * FROM ride");

        res.json(rides.rows);
    } catch (err) {
        console.log(err);
    }
});

//get single ride
router.get("/ride-single", async (req, res) => {
    try {
        const { ride_id } = req.body;
        const rows = await pool.query(`SELECT * FROM ride 
                                        WHERE ride_id = $1`,
                                        [ride_id]);
        res.json(rows.rows);
    } catch (err) {
        console.log(err);
    }
});

//get all attractions
router.get("/attraction-all", async (req, res) => {
    try {
        const attractions = await pool.query("SELECT * FROM attraction");
        res.json(attractions.rows);
    } catch (err) {
        console.log(err);
    }
});

//get single attraction
router.get("/attraction-single", async (req, res) => {
    try {
        const { attraction_id } = req.body;
        const rows = await pool.query(`SELECT * FROM attraction 
                                        WHERE attraction_id = $1`,
                                        [attraction_id]);

        res.json(rows.rows);
    } catch (err) {
        console.log(err);
    }
});

router.post("/ride-create", authorize, async (req, res) => {
    try {
        const role = req.user.type;
        if (role == "manager") {
            const { name, description, location, //broken, rainedout, new ride defatult false
                age_restriction, height_restriction, picture } = req.body;
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
                [name, description, location, false, false,
                    age_restriction, height_restriction, picture]
            );
            res.json(newRide.rows[0]);
        } else {
            res.sendStatus(401);
        }

    } catch (err) {
        console.log(err);
    }
});

router.post("/attraction-create", authorize, async (req, res) => {
    try {
        const role = req.user.type;
        if (role == "manager") {
            const { name, description, location, //rainedout, new attraction defatult false
                age_restriction, picture } = req.body;
            const newAttraction = await pool.query(
                `INSERT INTO attraction (name, 
                                        description, 
                                        location, 
                                        rainedout, 
                                        age_restriction, 
                                        picture) 
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
                [name, description, location, false,
                    age_restriction, picture]
            );
            res.json(newAttraction.rows[0]);
        } else {
            res.sendStatus(401);
        }

    } catch (err) {
        console.log(err);
    }
});

router.put("/ride-modify", authorize, async (req, res) => {
    try {
        const { ride_id, name, description, location, broken, rainedout,
            age_restriction, height_restriction, picture } = req.body;
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
            [name, description, location, broken, rainedout,
                age_restriction, height_restriction, picture, ride_id]
        );
        res.json("success");

    } catch (err) {
        res.json("error");
        console.log(err);
    }
});

router.put("/attraction-modify", authorize, async (req, res) => {
    try {
        const { attraction_id, name, description, location, rainedout,
            age_restriction, picture } = req.body;
        const udpateAttraction = await pool.query(
            `UPDATE attraction SET name = $1,
                            description = $2,
                            location = $3, 
                            rainedout = $4,
                            age_restriction = $5,
                            picture = $6
                    WHERE attraction_id = $7`,
            [name, description, location, rainedout, age_restriction, picture, attraction_id]
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
        const deleteRide = await pool.query(
            `DELETE FROM ride WHERE ride_id = $1`,
            [ride_id]
        );
        if (deleteRide.rowCount == 1) {
            res.json("success");
        }
        else {
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
        }
        else {
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
            "SELECT COUNT(*) FROM RideUsage WHERE ride_id = $1 GROUP BY MONTH(date_used) + '-' + YEAR(date_used)"
            [ride_id]
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

router.get("/spike-by-week", authorize, async (req, res) => {
    try {
        const spikeWeek = await pool.query(
            "SELECT MAX(COUNT(*)) FROM EntryPass GROUP BY WEEK(time_purchased)"
        );
        res.json(spikeWeek.rows[0]);

    } catch (err) {
        console.log(err);
    }
});

router.get("/spike-by-month", authorize, async (req, res) => {
    try {
        const spikeWeek = await pool.query(
            "SELECT MAX(COUNT(*)) FROM EntryPass GROUP BY MONTH(time_purchased)"
        );
        res.json(spikeWeek.rows[0]);

    } catch (err) {
        console.log(err);
    }
});


module.exports = router;