'use strict';

var usonic = require('../build/Release/usonic.node');
var ts = require('typesystem');

var isPin = function (value) {
    return ts.isInteger(value) && value >= 0 && value <= 53;
};

exports.sensor = function (echoPin, triggerPin) {
    ts.checkRequired(echoPin, 'echoPin', isPin);
    ts.checkRequired(triggerPin, 'triggerPin', isPin);

    return function () {
        return usonic.getDistanceCm(echoPin, triggerPin);
    };
};
