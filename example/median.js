'use strict';

var UltrasonicSensor = require('../index.js').UltrasonicSensor;

var ultrasonicSensor = new UltrasonicSensor(15, 14);

function getMedian(a, b, c) {
    return Math.max(Math.min(a, b), Math.min(Math.max(a, b), c));
}

var count = 0;
var maxDistanceCm = -Infinity;
var minDistanceCm = Infinity;
var start = Date.now();

(function main() {
    setTimeout(function () {
        var a = ultrasonicSensor.getDistanceCm();

        setTimeout(function () {
            var b = ultrasonicSensor.getDistanceCm();

            setTimeout(function () {
                var c = ultrasonicSensor.getDistanceCm();

                var median = getMedian(a, b, c);

                if (median > maxDistanceCm) {
                    maxDistanceCm = median;
                }

                if (median < minDistanceCm) {
                    minDistanceCm = median;
                }

                process.stdout.clearLine();
                process.stdout.cursorTo(0);

                process.stdout.write(
                    'median: ' + median.toFixed(2) +
                    ', min: ' + minDistanceCm.toFixed(2) +
                    ', max: ' + maxDistanceCm.toFixed(2) +
                    ', count: ' + (count += 1) +
                    ' (' + ((Date.now() - start) / 1000).toFixed(2) + ' sec)'
                );

                main();
            }, 60);
        }, 60);
    }, 60);
}());
