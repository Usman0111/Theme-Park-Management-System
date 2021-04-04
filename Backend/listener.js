const express = require("express");
const app = express();
const cors = require("cors");

const pool = require("./db");

// Connect to the DB
app.connect(pgConString, function (err, client) {
    if (err) {
      console.error(err)
    }
    // Handle notifications
    client.on('notification', function (msg) {
      const payload = msg.payload
      console.log(payload)
      // Send payload into a queue etc...
    })
    // Listen for NOTIFY calls
    var query = client.query('LISTEN db_notifications')
  })