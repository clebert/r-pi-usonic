'use strict';

var usonic = require('../build/Release/usonic.node');
var ts     = require('typesystem');

var isPin = function (value) {
    return ts.isInteger(value) && value >= 0 && value <= 53;
};

var isTimeout = function (value) {
    return ts.isInteger(value) && value > 0;
};

exports.sensor = function (echoPin, triggerPin, timeout) {
    ts.checkArgument(echoPin, isPin);
    ts.checkArgument(triggerPin, isPin);

    timeout = ts.checkArgument(timeout, isTimeout, 750);

    return function () {
        return usonic.getDistance(echoPin, triggerPin, timeout);
    };
};
