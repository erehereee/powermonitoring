const { password } = require('pg/lib/defaults');
const bcrypt = require('bcrypt');
const pool = require('../helper/helperdb');
// const mongoServices = require('../helper/helpermongo');

// const db = new mongoServices('power');
// const collection = 'data';

let userState = false;
let admin = false;

const getUser = (req, res) => {
    pool.query("SELECT * FROM users", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const UserSignUp = async (req, res) => {
    const { username, password, role } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const addUser = `INSERT INTO users (username, password, role) VALUES ('${username}','${hashPassword}', '${role}')`
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
                res.send({message : "Login Successfully"});
                userState = true;
                res.redirect('dashboard')
                if(userInfo.role == 'ADMIN') {
                    return admin = true;
                }
                else {
                    return admin = false;
                }
            }
            else {
                res.send({message : "Login Failed"});
            }
        }
        catch {
            res.status(500).send();
        }
    });

}

const UserLogout = (req, res) => {
    if(!admin && !userState) {
        console.log("You not login");
    }
    return admin = false, userState = false
}

function AuthUser (req, res, next) {
    if(!userState) {
        res.status(403)
        return res.send("You need to sign in")
    }
    next();
}

function AuthRole (req, res, next) {
        if(!admin) {
            res.status(403)
            return res.send("You not have permission to access this.")
        }
        next();
}

const getData = async (req, res) => {
    try {
        pool.query("SELECT * from calculate_daily", (error, result) => {
            if(error) throw error;
            res.status(200).json(result.rows);
        })
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('An error occurred while fetching data.');
    }
}

module.exports = {
    getUser,
    UserSignUp,
    UserLogIn,
    AuthUser,
    AuthRole,
    getData,
    UserLogout
}