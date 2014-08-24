'use strict';

var usonic = require('../build/Release/usonic.node');
var ts     = require('typesystem');

var isPin = function (value) {
    return ts.isUInt(value) && value <= 53;
};

var isTimeout = function (value) {
    return ts.isUInt(value) && value > 0;
};

exports.sensor = function (echoPin, triggerPin, timeout) {
    ts.check(echoPin, isPin);
    ts.check(triggerPin, isPin);

    timeout = ts.check(timeout, isTimeout, 750);

    return function () {
        return usonic.getDistance(echoPin, triggerPin, timeout);
    };
};
