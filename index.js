'use strict';

var typeutil = require('typeutil');

var usonic;

if (process.env.R_PI_USONIC_TEST !== 'true') {
    usonic = require('./build/Release/usonic');
} else {
    usonic = {
        getDistanceCm: function (echoPin, triggerPin) {
            return echoPin - triggerPin;
        }
    };
}

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

    this.getDistanceCm = typeutil.typify(function () {
        return usonic.getDistanceCm(echoPin, triggerPin);
    }, '() => number');
}, '(number, number) => void');

exports.UltrasonicSensor = UltrasonicSensor;
