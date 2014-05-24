'use strict';

var async = require('async');
var typeutil = require('typeutil');
var usonic = require('./build/Release/usonic.node');

function getMedian(a, b, c) {
    return Math.max(Math.min(a, b), Math.min(Math.max(a, b), c));
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

    this.getDistanceCm = function () {
        return usonic.getDistanceCm(echoPin, triggerPin);
    };

    this.getMedianDistanceCm = function (delayMs, skipErrors, callback) {
        var distancesCm = [];

        async.whilst(function () {
            return distancesCm.length < 3;
        }, function (callback) {
            setTimeout(function () {
                var distanceCm = usonic.getDistanceCm(echoPin, triggerPin);

                if (distanceCm !== -1 || !skipErrors) {
                    distancesCm.push(distanceCm);
                }

                callback();
            }, delayMs);
        }, function () {
            var a = distancesCm[0];
            var b = distancesCm[1];
            var c = distancesCm[2];

            callback(getMedian(a, b, c));
        });
    };
}, '(number, number) => void');

module.exports = UltrasonicSensor;
