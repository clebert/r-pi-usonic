'use strict';

var UltrasonicSensor = require('../index').UltrasonicSensor;

var ultrasonicSensor = new UltrasonicSensor(15, 14);

setInterval(function () {
    console.log(ultrasonicSensor.getDistanceCm().toFixed(2));
}, 60);
