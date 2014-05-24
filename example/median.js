'use strict';

var readline = require('readline');
var UltrasonicSensor = require('../index.js');
var util = require('util');

function getMedian(a, b, c) {
    return Math.max(Math.min(a, b), Math.min(Math.max(a, b), c));
}

function Median(echoPin, triggerPin) {
    this.count = 0;
    this.max = -Infinity;
    this.min = Infinity;
    this.start = Date.now();
    this.ultrasonicSensor = new UltrasonicSensor(echoPin, triggerPin);
}

Median.prototype.main = function () {
    var self = this;

    setTimeout(function () {
        var a = self.ultrasonicSensor.getDistanceCm();

        setTimeout(function () {
            var b = self.ultrasonicSensor.getDistanceCm();

            setTimeout(function () {
                var c = self.ultrasonicSensor.getDistanceCm();

                var median = getMedian(a, b, c);

                self.setMax(median);
                self.setMin(median);

                self.print(median);

                self.main();
            }, 60);
        }, 60);
    }, 60);
};

Median.prototype.print = function (median) {
    var format = 'median: %s, min: %s, max: %s, count: %d (%s seconds)';
    var min = this.min.toFixed(2);
    var max = this.max.toFixed(2);
    var count = this.count;
    var time = ((Date.now() - this.start) / 1000).toFixed(2);

    process.stdout.clearLine();
    process.stdout.cursorTo(0);

    var message = util.format(format, median.toFixed(2), min, max, count, time);

    process.stdout.write(message);
};

Median.prototype.setMax = function (median) {
    if (median > this.max) {
        this.max = median;
    }
};

Median.prototype.setMin = function (median) {
    if (median < this.min) {
        this.min = median;
    }
};

function parsePin(string, defaultPin) {
    var pin = parseInt(string, 10);

    if (isNaN(pin)) {
        return defaultPin;
    }

    return pin;
}

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('echoPin (default 24): ', function (string) {
    var echoPin = parsePin(string, 24);

    rl.question('triggerPin (default 23): ', function (string) {
        var triggerPin = parsePin(string, 23);

        rl.close();

        new Median(echoPin, triggerPin).main();
    });
});
