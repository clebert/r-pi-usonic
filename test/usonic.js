'use strict';

var UltrasonicSensor = require('../index');

var ultrasonicSensor = new UltrasonicSensor(15, 14);

setInterval(function () {
    console.log(ultrasonicSensor.getDistanceCm());
}, 60);
