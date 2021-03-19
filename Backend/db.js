const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: process.env.PSQL_USER,
  password: process.env.PSQL_PASSWORD,
  database: process.env.PSQL_DATABASE,
  host: process.env.PSQL_HOST,
  port: process.env.PSQL_PORT,
});

module.exports = pool;
