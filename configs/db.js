const mysql = require('mysql');
const util = require('util');
require('dotenv').config();

// connect to mysql
const pool = mysql.createPool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    connectionLimit : 10,
});
// check for successful connection
//  resolve or reject the Promise accordingly
pool.query = util.promisify(pool.query);
console.log('Database connection established');

module.exports = pool;