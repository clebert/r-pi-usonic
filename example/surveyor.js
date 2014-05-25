'use strict';

var readline = require('readline');
var UltrasonicSensor = require('../index.js');
var util = require('util');

function Surveyor(echoPin, triggerPin) {
    this.ultrasonicSensor = new UltrasonicSensor(echoPin, triggerPin);
    this.min = Infinity;
    this.max = -Infinity;
    this.start = Date.now();
}

Surveyor.prototype.measure = function () {
    this.ultrasonicSensor.getMedianDistanceCm(20, false, function (distanceCm) {
        this.setMin(distanceCm);
        this.setMax(distanceCm);

        this.print(distanceCm);

        this.measure();
    }.bind(this));
};

Surveyor.prototype.print = function (distanceCm) {
    var format = 'distance: %s cm, min: %s cm, max: %s cm, time: %s s';

    process.stdout.clearLine();
    process.stdout.cursorTo(0);

    var min = this.min.toFixed(2);
    var max = this.max.toFixed(2);
    var time = ((Date.now() - this.start) / 1000).toFixed(2);

    process.stdout.write(
        util.format(format, distanceCm.toFixed(2), min, max, time)
    );
};

Surveyor.prototype.setMax = function (distanceCm) {
    if (distanceCm !== -1 && distanceCm > this.max) {
        this.max = distanceCm;
    }
};

Surveyor.prototype.setMin = function (distanceCm) {
    if (distanceCm !== -1 && distanceCm < this.min) {
        this.min = distanceCm;
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

        new Surveyor(echoPin, triggerPin).measure();
    });
});
