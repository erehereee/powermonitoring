const { password } = require('pg/lib/defaults');
const bcrypt = require('bcrypt');
const pool = require('../helper/helperdb');
const mongoServices = require('../helper/helpermongo');

const db = new mongoServices('power');
const collection = 'data';

const getUser = (req, res) => {
    pool.query("SELECT * FROM users", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const UserSignUp = async (req, res) => {
    const { username, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const addUser = `INSERT INTO users (username, password) VALUES ('${username}','${hashPassword}')`
    try {
        pool.query(addUser, (error, results) => {
            if(error) throw error;
            res.status(201).send("User has been added");
        })
    }
    catch {
        res.status(500).send();
    }
}

const UserLogIn = async (req, res) => {
    const {username, password} = req.body;
    pool.query("SELECT * from users", async (error, results) => {
        if (error) throw error;
        const userInfo = results.rows.find(user => user.username === username);
        try {
            if(await bcrypt.compare(password, userInfo.password)) {
                res.send("Login Success");
            }
            else {
                res.send("Login Failed");
            }
        }
        catch {
            res.status(500).send();
        }
    });

}

const getData = async (req, res) => {
    try {
        const data = await db.readData(collection);
        const month = "Aug"; // Bulan yang ingin difilter
        const filteredData = data.filter(doc => doc.data.date.includes("08"));
        
        if (filteredData.length === 0) {
            return res.status(404).send('No data found for the specified month.');
        }
        return res.send(filteredData);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('An error occurred while fetching data.');
    }
}

module.exports = {
    getUser,
    UserSignUp,
    UserLogIn,
    getData
};