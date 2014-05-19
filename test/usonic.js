'use strict';

var UltrasonicSensor = require('../index').UltrasonicSensor;

var ultrasonicSensor = new UltrasonicSensor(15, 14);

var count = 0;
var maxDistanceCm = -Infinity;
var minDistanceCm = Infinity;

setInterval(function () {
    var distanceCm = ultrasonicSensor.getDistanceCm();

    if (distanceCm > maxDistanceCm) {
        maxDistanceCm = distanceCm;
    }

    if (distanceCm < minDistanceCm) {
        minDistanceCm = distanceCm;
    }

    process.stdout.clearLine();
    process.stdout.cursorTo(0);

    process.stdout.write(
        'current: ' + distanceCm.toFixed(2) +
        ', min: ' + minDistanceCm.toFixed(2) +
        ', max: ' + maxDistanceCm.toFixed(2) +
        ', count: ' + (count += 1)
    );
}, 60);
