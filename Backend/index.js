const mqttServices = require('./services/mqttServices');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const router = require('./router/router')
const { AuthUser } = require('./controller/controller');
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

app.use(cors());
app.use(express.static('public'))
app.use(express.json());
app.use('/', router);

console.log(__dirname);


// io.on("connect", socket => {
//     console.log(`Socket Connected : ${socket.id}`)
// })


server.listen(port, console.log(`Server listening on port : ${port}`));
