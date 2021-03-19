const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

//Valid users
const validUserTypes = ["manager", "customer", "attendant", "maintainer"];

//create user account
router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password, user_type } = req.body;

    if (!validUserTypes.includes(user_type)) {
      return res.status(400).send("Invalid user type");
    }

    const user = await pool.query(
      `SELECT * FROM useraccount WHERE email = $1`,
      [email]
    );

    if (user.rows.length !== 0) {
      return res.status(401).send("User already exists");
    }

    const saltRound = 10;
    const genSalt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, genSalt);

    const newUser = await pool.query(
      "INSERT INTO useraccount (first_name, last_name, email, password, user_type) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [first_name, last_name, email, bcryptPassword, user_type]
    );

    res.send(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//login and generate jwt token
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query(
      "SELECT * from useraccount WHERE email = $1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(401).send("Invalid Credential");
    }

    const validPass = bcrypt.compare(password, user.rows[0].password);

    if (!validPass) {
      return res.status(401).send("Invalid Credential");
    }

    const user_id = user.rows[0].account_id;
    const user_type = user.rows[0].user_type;
    const token = jwtGenerator(user_id, user_type);

    return res.json({ user_id, user_type, token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//verify if jwt token valid
router.get("/verify", authorize, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
