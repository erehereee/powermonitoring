const mqttServices = require('./services/mqttServices');
const router = require('./router/router')
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const port = 3000;

const MQTT_HOST_NAME = "mqtt://127.0.0.1:1883";

const mqttClient = new mqttServices(MQTT_HOST_NAME);

mqttClient.connect();

mqttClient.subscribe("data/pm/ATS", (err) => {
    if(!err) {
        console.log("Connected");
    }
});

app.use(express.static('public'))
app.use('/', router);

io.on("connect", socket => {
    console.log(`Socket Connected : ${socket.id}`)
})


server.listen(port, console.log(`Server listening on port : ${port}`));
