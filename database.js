const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_name
});

pool.query = util.promisify(pool.query);

module.exports = pool;