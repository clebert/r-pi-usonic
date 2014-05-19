'use strict';

var UltrasonicSensor = require('../index').UltrasonicSensor;

var ultrasonicSensor = new UltrasonicSensor(15, 14);

var maxDistanceCm = -Infinity;
var minDistanceCm = Infinity;

setInterval(function () {
    var distanceCm = ultrasonicSensor.getDistanceCm().toFixed(2);

    if (distanceCm > maxDistanceCm) {
        maxDistanceCm = distanceCm;
    }

    if (distanceCm < minDistanceCm) {
        minDistanceCm = distanceCm;
    }

    process.stdout.clearLine();
    process.stdout.cursorTo(0);

    process.stdout.write(
        'current: ' + distanceCm + ', min: ' + minDistanceCm + ', max: ' + maxDistanceCm
    );
}, 60);
