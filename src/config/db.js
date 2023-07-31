const { Pool } = require('pg');

const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'test',
  password: "123456789",
  port: 3306,
});

module.exports = pool;
