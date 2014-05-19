'use strict';

var typeutil = require('typeutil');
var usonic = require('./build/Release/usonic');

var UltrasonicSensor = typeutil.typify(function (echoPin, triggerPin) {
    if (!(this instanceof UltrasonicSensor)) {
        return new UltrasonicSensor(echoPin, triggerPin);
    }

    if (!typeutil.isInteger(echoPin) || echoPin < 0 || echoPin > 53) {
        throw new Error('invalid echo pin');
    }

    if (!typeutil.isInteger(triggerPin) || triggerPin < 0 || triggerPin > 53) {
        throw new Error('invalid trigger pin');
    }

    this.getDistanceCm = typeutil.typify(function () {
        return usonic.getDistanceCm(echoPin, triggerPin);
    }, '() => number');
}, '(number, number) => void');

exports.UltrasonicSensor = UltrasonicSensor;
