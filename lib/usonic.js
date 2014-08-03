'use strict';

var usonic = require('../build/Release/usonic.node');
var ts = require('typesystem');

var isPin = function (value) {
    return ts.isInteger(value) && value >= 0 && value <= 53;
};

var isTimeout = function (value) {
    return ts.isInteger(value) && value > 0;
};

exports.sensor = function (echoPin, triggerPin, timeout) {
    ts.checkRequired(echoPin, 'echoPin', isPin);
    ts.checkRequired(triggerPin, 'triggerPin', isPin);

    timeout = ts.checkOptional(timeout, 'timeout', isTimeout, 450);

    return function () {
        return usonic.getDistance(echoPin, triggerPin, timeout);
    };
};
