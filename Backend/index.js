const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const mqttServices = require('./services/mqttServices');
const router = require('./router/router')
const { AuthUser, checkLogin } = require('./controller/controller');
const port = 3000;
const cors = require('cors');

const MQTT_HOST_NAME = "mqtt://127.0.0.1:1883";

const mqttClient = new mqttServices(MQTT_HOST_NAME);

// mqttClient.connect();

// mqttClient.subscribe("data/pm/ATS", (err) => {
//     if(!err) {
//         console.log("Connected");
//     }
// });
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.use(express.json());
app.use('/user', router);


app.get('/login', checkLogin, (req, res) => {
    res.render('login', {
        title : 'Login',
    })
})

app.use(expressLayouts);

app.get('/', AuthUser, (req, res) => {
    res.render('index', {
        layout : 'layouts/main-layout',
        title : 'Dashboard',
    })
})

app.get('/pm', AuthUser, (req, res) => {
    res.render('plant', {
        layout : 'layouts/main-layout',
        title : 'Power Monitoring',
    })
})

app.get('/pln', AuthUser, (req, res) => {
    res.render('energy-pln', {
        layout : 'layouts/main-layout',
        title : 'EMon PLN',
    })
})

app.get('/genset', AuthUser, (req, res) => {
    res.render('energy-genset', {
        layout : 'layouts/main-layout',
        title : 'EMon Genset',
    })
})

app.get('/report', AuthUser, (req, res) => {
    res.render('report', {
        layout : 'layouts/main-layout',
        title : 'Report',
    })
})

// io.on("connect", socket => {
//     console.log(`Socket Connected : ${socket.id}`)
// })


server.listen(port, console.log(`Server listening on port : ${port}`));
