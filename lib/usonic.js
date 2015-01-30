'use strict';

var assert = require('expressive-assertion');
var usonic = require('../build/Release/usonic.node');
var ts     = require('typesystem');

var assertIsPin = function (value) {
    assert(function () {
        return ts.isInteger(value) && value >= 0 && value <= 53;
    });
};

var assertIsTimeout = function (value) {
    assert(function () {
        return ts.isInteger(value) && value > 0;
    });
};

var createSensor = function (echoPin, triggerPin, timeout) {
    assertIsPin(echoPin);
    assertIsPin(triggerPin);

    if (ts.isNullOrUndefined(timeout)) {
        timeout = 750;
    } else {
        assertIsTimeout(timeout);
    }

    return function () {
        return usonic.getDistance(echoPin, triggerPin, timeout);
    };
};

exports.createSensor = createSensor;
