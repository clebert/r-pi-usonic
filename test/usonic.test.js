/* global describe, it */

'use strict';

var assert = require('extended-assert');
var mock = assert.requireMock(__dirname, '../build/Release/usonic.node', {});
var UltrasonicSensor = require('../index.js');

describe('UltrasonicSensor()', function () {

    it('should throw an illegal-arguments error', function () {
        assert.throwsError(function () {
            return new UltrasonicSensor();
        }, 'TypeError', '(!>number, number) => void');
    });

    it('should throw a missing-new-keyword error', function () {
        assert.throwsError(function () {
            /* jshint -W064 */

            UltrasonicSensor(0, 0);
        }, 'Error', 'Missing new keyword.');
    });

    it('should not throw an invalid-echo-pin error', function () {
        var type = 'Error';
        var message = 'Invalid echo pin.';

        assert.doesNotThrowError(function () {
            return new UltrasonicSensor(0, 0);
        }, type, message);

        assert.doesNotThrowError(function () {
            return new UltrasonicSensor(53, 0);
        }, type, message);
    });

    it('should throw an invalid-echo-pin error', function () {
        var type = 'Error';
        var message = 'Invalid echo pin.';

        assert.throwsError(function () {
            return new UltrasonicSensor(-1, 0);
        }, type, message);

        assert.throwsError(function () {
            return new UltrasonicSensor(54, 0);
        }, type, message);

        assert.throwsError(function () {
            return new UltrasonicSensor(0.1, 0);
        }, type, message);

        assert.throwsError(function () {
            return new UltrasonicSensor(53.1, 0);
        }, type, message);
    });

    it('should not throw an invalid-trigger-pin error', function () {
        var type = 'Error';
        var message = 'Invalid trigger pin.';

        assert.doesNotThrowError(function () {
            return new UltrasonicSensor(0, 0);
        }, type, message);

        assert.doesNotThrowError(function () {
            return new UltrasonicSensor(0, 53);
        }, type, message);
    });

    it('should throw an invalid-trigger-pin error', function () {
        var type = 'Error';
        var message = 'Invalid trigger pin.';

        assert.throwsError(function () {
            return new UltrasonicSensor(0, -1);
        }, type, message);

        assert.throwsError(function () {
            return new UltrasonicSensor(0, 54);
        }, type, message);

        assert.throwsError(function () {
            return new UltrasonicSensor(0, 0.1);
        }, type, message);

        assert.throwsError(function () {
            return new UltrasonicSensor(0, 53.1);
        }, type, message);
    });

    describe('.getDistanceCm()', function () {

        it('should call the corresponding mock funtion with pin-4 and pin-3 ' +
            'as arguments and return its return value', function () {
            var ultrasonicSensor = new UltrasonicSensor(4, 3);
            var returnValue = {};

            mock.getDistanceCm = function (echoPin, triggerPin) {
                assert.strictEqual(echoPin, 4);
                assert.strictEqual(triggerPin, 3);

                return returnValue;
            };

            assert.strictEqual(ultrasonicSensor.getDistanceCm(), returnValue);
        });
    });
});
