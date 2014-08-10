'use strict';

var readline   = require('readline');
var statistics = require('math-statistics');
var usonic     = require('../lib/usonic');

var print = function (distances) {
    var distance = statistics.median(distances);

    process.stdout.clearLine();
    process.stdout.cursorTo(0);

    if (distance < 0) {
        process.stdout.write('Error: Measurement timeout.\n');
    } else {
        process.stdout.write('Distance: ' + distance.toFixed(2) + ' cm');
    }
};

var init = function (config) {
    var sensor = usonic.sensor(config.echoPin, config.triggerPin, config.timeout);

    console.log(config);

    var distances;

    (function measure() {
        if (!distances || distances.length === config.rate) {
            if (distances) {
                print(distances);
            }

            distances = [];
        }

        setTimeout(function () {
            distances.push(sensor());

            measure();
        }, config.delay);
    }());
};

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

getInteger('Echo pin', 24, function (echoPin) {
    getInteger('Trigger pin', 23, function (triggerPin) {
        getInteger('Measurement timeout in µs', 750, function (timeout) {
            getInteger('Measurement delay in ms', 60, function (delay) {
                getInteger('Measurements per sample', 5, function (rate) {
                    rl.close();

                    init({
                        echoPin: echoPin,
                        triggerPin: triggerPin,
                        timeout: timeout,
                        delay: delay,
                        rate: rate
                    });
                });
            });
        });
    });
});
