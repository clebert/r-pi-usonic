'use strict';

function init(echoPin, triggerPin) {
    var UltrasonicSensor = require('../index.js').UltrasonicSensor;
    var ultrasonicSensor = new UltrasonicSensor(echoPin, triggerPin);

    function getMedian(a, b, c) {
        return Math.max(Math.min(a, b), Math.min(Math.max(a, b), c));
    }

    var count = 0;
    var max = -Infinity;
    var min = Infinity;
    var start = Date.now();

    (function main() {
        setTimeout(function () {
            var a = ultrasonicSensor.getDistanceCm();

            setTimeout(function () {
                var b = ultrasonicSensor.getDistanceCm();

                setTimeout(function () {
                    var c = ultrasonicSensor.getDistanceCm();

                    var median = getMedian(a, b, c);

                    if (median > max) {
                        max = median;
                    }

                    if (median < min) {
                        min = median;
                    }

                    process.stdout.clearLine();
                    process.stdout.cursorTo(0);

                    process.stdout.write(
                        'median: ' + median.toFixed(2) +
                        ', min: ' + min.toFixed(2) +
                        ', max: ' + max.toFixed(2) +
                        ', count: ' + (count += 1) +
                        ' (' + ((Date.now() - start) / 1000).toFixed(2) + ' s)'
                    );

                    main();
                }, 60);
            }, 60);
        }, 60);
    }());
}

var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('echoPin (default 15): ', function (echoPin) {
    rl.question('triggerPin (default 14): ', function (triggerPin) {
        rl.close();

        init(echoPin || 15, triggerPin || 14);
    });
});
