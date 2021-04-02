const express = require("express");
const app = express();
const cors = require("cors");

const pool = require("./db");

app.use(express.json());
app.use(cors());

app.use("/auth", require("./routes/jwtAuth"));

app.use("/attraction", require("./routes/attraction"));
app.use("/ride", require("./routes/ride"));
app.use("/customer", require("./routes/customer"));
app.use("/manager", require("./routes/manager"));

app.get("", async (req, res) => {
  try {
    res.send("server running boi");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => {
  console.log("server listening on part 5000");
});
