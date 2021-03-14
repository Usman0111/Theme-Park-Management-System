const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json());

app.get("/person", async (req, res) => {
  try {
    const people = await pool.query("SELECT * FROM person");
    res.json(people.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/person", async (req, res) => {
  try {
    const person = req.body;

    const newPerson = await pool.query(
      "INSERT INTO person (name,dob) VALUES ($1,$2) RETURNING *",
      [person.name, person.dob]
    );

    res.json(newPerson.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

app.put("/person/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const person = req.body;

    const updatePerson = await pool.query(
      "UPDATE person SET name=$1 WHERE id=$2",
      [person.name, id]
    );
    console.log(updatePerson);

    res.json(updatePerson.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => {
  console.log("server listening on part 5000");
});
