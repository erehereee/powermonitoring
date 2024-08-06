const { password } = require('pg/lib/defaults');
const bcrypt = require('bcrypt');
const pool = require('../helper/helperdb');
// const mongoServices = require('../helper/helpermongo');

// const db = new mongoServices('power');
// const collection = 'data';
let userState = [];
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
        userState = results.rows.find(user => user.username === username);
        try {
            if(await bcrypt.compare(password, userState.password)) {
                res.redirect('/dashboard');
                req.msg = "Login Successfully";
                console.log(req.msg);
            }
            else {
                req.msg = "Wrong password";
                console.log(req.msg);
            }
        }
        catch {
            req.msg = "User not found";
            res.redirect('/login');
            res.status(500)
            console.log(req.msg)
        }
    });

}

const UserLogout = (req, res) => {
    if(userState.length < 1) {
        res.redirect('/login')
        req.msg = "User not found. You must be login.";
        console.log(req.msg);
    }
    else {
        userState = [];
        res.redirect('/login')
        req.msg = "Logout Successfully";
        console.log(req.msg)
    }
}

function AuthUser (req, res, next) {
    if(userState.username == null) {
        req.msg = "You must sign in.";
        console.log(req.msg)
    }
    next();
}

function AuthRole (role) {
        return (req, res, next) => {
            if(userState.role !== role) {
            res.status(401)
            return res.send("You not have permission to access this.")
        }
        next();
}
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