'use strict';

var typeutil = require('typeutil');
var usonic = require('./build/Release/usonic.node');

function isValidPin(pin) {
    return typeutil.isInteger(pin) && pin >= 0 && pin <= 53;
}

var UltrasonicSensor = typeutil.typify(function (echoPin, triggerPin) {
    if (!(this instanceof UltrasonicSensor)) {
        throw new Error('Missing new keyword.');
    }

    if (!isValidPin(echoPin)) {
        throw new Error('Invalid echo pin.');
    }

    if (!isValidPin(triggerPin)) {
        throw new Error('Invalid trigger pin.');
    }

    this.getDistanceCm = function () {
        return usonic.getDistanceCm(echoPin, triggerPin);
    };
}, '(number, number) => void');

module.exports = UltrasonicSensor;
