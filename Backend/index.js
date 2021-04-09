const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

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
