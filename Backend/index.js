const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const pool = require("./db");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, "../Frontend/build")));
app.use(express.static("images"));

app.use("/auth", require("./routes/jwtAuth"));
app.use("/attraction", require("./routes/attraction"));
app.use("/ride", require("./routes/ride"));
app.use("/customer", require("./routes/customer"));
app.use("/manager", require("./routes/manager"));
app.use("/attendant", require("./routes/attendant"));
app.use("/maintainer", require("./routes/maintainer"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../Frontend/build", "index.html"));
});

// router.post("/sample", async (req, res) => {
//   try {
//   } catch (err) {
//     console.log(err);
//   }
// });

app.listen(5000, () => {
  console.log("server listening on part 5000");
});

//listend for tirggers
const { Client } = require("pg");
const sendEmail = require("./utils/mailer");
const { compareSync } = require("bcrypt");

const client = new Client({
  user: process.env.PSQL_USER,
  password: process.env.PSQL_PASSWORD,
  database: process.env.PSQL_DATABASE,
  host: process.env.PSQL_HOST,
  port: process.env.PSQL_PORT,
});

client.connect();
client.query("LISTEN new_attendant_notification");
client.query("LISTEN ride_fixed_notification");

client.on("notification", async (msg) => {
  console.log(msg.channel);
  console.log(JSON.parse(msg.payload));
  const channel = msg.channel;
  const payload = JSON.parse(msg.payload);

  let receiver, subject, message;

  if (channel === "new_attendant_notification") {
    const query = await client.query(
      `SELECT * FROM useraccount WHERE account_id = $1`,
      [payload.attendant_id]
    );

    const attendant = query.rows[0];

    receiver = "managertpms@gmail.com";
    subject = "New Attendant Joined";
    message = `${payload.message}\n\nFirst Name: ${attendant.first_name}\nLast Name: ${attendant.last_name}\nEmail: ${attendant.email}`;

    const email = { receiver, subject, message };

    console.log(`sending email to park manager`);
    sendEmail(email).then((res) =>
      console.log("email sent successfuly to ", res.accepted)
    );
  }

  if (channel === "ride_fixed_notification") {
    const query = await pool.query(
      `SELECT * FROM useraccount WHERE account_id = $1`,
      [payload.attendant_id]
    );

    const attendant = query.rows[0];

    receiver = attendant.email;
    subject = "Your Ride is Fixed";
    message = `${payload.message} by the following maintainer\n\nFirst Name: ${attendant.first_name}\nLast Name: ${attendant.last_name}\nEmail: ${attendant.email}`;

    const email = { receiver, subject, message };
    console.log(`sending email to attendant`);
    sendEmail(email).then((res) =>
      console.log("email sent successfuly to ", res.accepted)
    );
  }
});
