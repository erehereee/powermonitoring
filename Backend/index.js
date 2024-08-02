const mqttServices = require('./services/mqttServices');
const express = require('express');
const app = express();
const port = 3000;

const MQTT_HOST_NAME = "mqtt://127.0.0.1:1883";

const mqttClient = new mqttServices(MQTT_HOST_NAME);

mqttClient.connect();

mqttClient.subscribe("data/pm/ATS", (err) => {
    if(!err) {
        console.log("Connected");
    }
});


app.listen(port, console.log(`Server listening on port : ${port}`));