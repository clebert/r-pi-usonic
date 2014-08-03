'use strict';

var readline = require('readline');
var usonic = require('../lib/usonic');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var getInteger = function (name, defaultValue, callback) {
    rl.question(name + ' (default ' + defaultValue + '): ', function (response) {
        var value = parseInt(response, 10);

        callback(isNaN(value) ? defaultValue : value);
    });
};

getInteger('echoPin', 24, function (echoPin) {
    getInteger('triggerPin', 23, function (triggerPin) {
        getInteger('timeout', 450, function (timeout) {
            rl.close();

            var cycles = 0;
            var sensor = usonic.sensor(echoPin, triggerPin, timeout);

            (function measure() {
                setTimeout(function () {
                    cycles += 1;

                    var distance = sensor();

                    process.stdout.clearLine();
                    process.stdout.cursorTo(0);

                    if (distance < 0) {
                        process.stdout.write('[' + cycles + '] Error: Measurement timeout.\n');
                    } else {
                        process.stdout.write('[' + cycles + '] Distance: ' + distance.toFixed(2) + ' cm');
                    }

                    measure();
                }, 20);
            }());
        });
    });
});
