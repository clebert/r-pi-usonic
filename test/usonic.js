'use strict';

var UltrasonicSensor = require('../index').UltrasonicSensor;

var ultrasonicSensor = new UltrasonicSensor(15, 14);

function getMedian(a, b, c) {
    return Math.max(Math.min(a, b), Math.min(Math.max(a, b), c));
}

var count = 0;
var maxDistanceCm = -Infinity;
var minDistanceCm = Infinity;
var start = Date.now();

function getDistanceCm() {
    setTimeout(function () {
        var a = ultrasonicSensor.getDistanceCm();

        setTimeout(function () {
            var b = ultrasonicSensor.getDistanceCm();

            setTimeout(function () {
                var c = ultrasonicSensor.getDistanceCm();

                var distanceCm = getMedian(a, b, c);

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
                    ', count: ' + (count += 1) +
                    ' (' + ((Date.now() - start) / 1000).toFixed(2) + ' sec)'
                );

                getDistanceCm();
            }, 60);
        }, 60);
    }, 60);
}

getDistanceCm();
