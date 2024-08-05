const mqtt = require('mqtt');
const mongoServices = require('../helper/helpermongo');

const db = new mongoServices('power');
const collection = 'data';

// db.connect();

function mqttServices(host) {
    this.mqttClient = null;
    this.host = host;
}

mqttServices.prototype.connect = function() {
    this.mqttClient = mqtt.connect(this.host);

    this.mqttClient.on("error", (err) => {
        console.log(err);
        this.mqttClient.end();
    })

    this.mqttClient.on("connect", () => {
        console.log("MQTT Client Connected");
    })

    this.mqttClient.on("message", (topic, message) => {
        db.insertData(collection,[{
            data : message.toString()
        }])
        console.log('Data successfully added');
    })

    this.mqttClient.on("close", () => {
        console.log("MQTT Client Disconnected");
    })
}

mqttServices.prototype.publish = function(topic, message, option) {
    this.mqttClient.publish(topic, message);
}

mqttServices.prototype.subscribe = function(topic, option) {
    this.mqttClient.subscribe(topic, option)
}

module.exports = mqttServices; 