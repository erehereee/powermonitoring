const { password } = require('pg/lib/defaults');
const bcrypt = require('bcrypt');
const pool = require('../helper/helperdb');

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


module.exports = {
    getUser,
    UserSignUp,
    UserLogIn,
};