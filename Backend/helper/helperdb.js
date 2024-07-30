const { password } = require('pg/lib/defaults');

const Pool = require('pg').Pool;

const pool = new Pool({
    host : "localhost",
    user : "postgres",
    password : "root",
    database : "postgres",
    port : "5432",
})

module.exports = pool;