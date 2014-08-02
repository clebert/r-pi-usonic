'use strict';

var readline = require('readline');
var usonic = require('../lib/usonic');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var parsePin = function (response, defaultPin) {
    var pin = parseInt(response, 10);

    return isNaN(pin) ? defaultPin : pin;
};

var defaultEchoPin = 24;
var defaultTriggerPin = 23;

rl.question('echoPin (default ' + defaultEchoPin + '): ', function (response) {
    var echoPin = parsePin(response, defaultEchoPin);

    rl.question('triggerPin (default ' + defaultTriggerPin + '): ', function (response) {
        rl.close();

        var triggerPin = parsePin(response, defaultTriggerPin);
        var sensor = usonic.sensor(echoPin, triggerPin);

        var measure = function () {
            setTimeout(function () {
                process.stdout.clearLine();
                process.stdout.cursorTo(0);
                process.stdout.write('distance: ' + sensor().toFixed(2) + ' cm');

                measure();
            }, 20);
        };

        measure();
    });
});
