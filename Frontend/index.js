const mongoServices = require('../Backend/helper/helpermongo');

const db = new mongoServices('power', 'data');

db.connect();

db.insertData([{
    nama : "gliv",
    password: "pass"
}])