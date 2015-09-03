'use strict';

var assert = require('expressive-assertion');
var exec   = require('child_process').exec;
var usonic = require('../build/Release/usonic.node');
var ts     = require('typesystem');

var initCalled  = false;
var initialized = false;

var init = function (callback) {
    if (initCalled) {
        throw new Error('`usonic.init()` already called');
    }

    initCalled = true;

    exec('cat /proc/cpuinfo | grep Hardware', function (error, stdout) {
        if (error) {
            return callback(error);
        }

        if (typeof stdout !== 'string') {
            return callback(new Error('unable to detect hardware'));
        }

        var hardware = stdout.split(':')[1].trim();

        if (hardware === 'BCM2708') {
            usonic.init(1);
        } else if (hardware === 'BCM2709') {
            usonic.init(2);
        } else {
            return callback(new Error('unknown hardware: "' + hardware + '"'));
        }

        initialized = true;

        callback(null);
    });
};

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

var createSensor = function (echoPin, triggerPin, timeout, testMode) {
    if (!initialized && !testMode) {
        throw new Error('please call `usonic.init()` first');
    }

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

exports.init         = init;
exports.createSensor = createSensor;
