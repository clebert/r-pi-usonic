/* global describe, it */

'use strict';

process.env.R_PI_USONIC_TEST = 'true';

var assert = require('extended-assert');
var usonic = require('../index.js');

describe('usonic', function () {

    describe('.UltrasonicSensor()', function () {

        it('should throw an illegal-arguments error', function () {
            assert.throwsError(function () {
                return new usonic.UltrasonicSensor();
            }, 'TypeError', '(!>number, number) => void');
        });

        it('should throw a missing-new-keyword error', function () {
            assert.throwsError(function () {
                usonic.UltrasonicSensor(0, 0);
            }, 'Error', 'Missing new keyword.');
        });

        it('should not throw an invalid-echo-pin error', function () {
            var type = 'Error';
            var message = 'Invalid echo pin.';

            assert.doesNotThrowError(function () {
                return new usonic.UltrasonicSensor(0, 0);
            }, type, message);

            assert.doesNotThrowError(function () {
                return new usonic.UltrasonicSensor(53, 0);
            }, type, message);
        });

        it('should throw an invalid-echo-pin error', function () {
            var type = 'Error';
            var message = 'Invalid echo pin.';

            assert.throwsError(function () {
                return new usonic.UltrasonicSensor(-1, 0);
            }, type, message);

            assert.throwsError(function () {
                return new usonic.UltrasonicSensor(54, 0);
            }, type, message);

            assert.throwsError(function () {
                return new usonic.UltrasonicSensor(0.1, 0);
            }, type, message);

            assert.throwsError(function () {
                return new usonic.UltrasonicSensor(53.1, 0);
            }, type, message);
        });

        it('should not throw an invalid-trigger-pin error', function () {
            var type = 'Error';
            var message = 'Invalid trigger pin.';

            assert.doesNotThrowError(function () {
                return new usonic.UltrasonicSensor(0, 0);
            }, type, message);

            assert.doesNotThrowError(function () {
                return new usonic.UltrasonicSensor(0, 53);
            }, type, message);
        });

        it('should throw an invalid-trigger-pin error', function () {
            var type = 'Error';
            var message = 'Invalid trigger pin.';

            assert.throwsError(function () {
                return new usonic.UltrasonicSensor(0, -1);
            }, type, message);

            assert.throwsError(function () {
                return new usonic.UltrasonicSensor(0, 54);
            }, type, message);

            assert.throwsError(function () {
                return new usonic.UltrasonicSensor(0, 0.1);
            }, type, message);

            assert.throwsError(function () {
                return new usonic.UltrasonicSensor(0, 53.1);
            }, type, message);
        });

        describe('.getDistanceCm()', function () {

            it('should throw an illegal-arguments error', function () {
                assert.throwsError(function () {
                    new usonic.UltrasonicSensor(0, 0).getDistanceCm(0);
                }, 'TypeError', '(!>...) => number');
            });

            it('should return 1', function () {
                var ultrasonicSensor = new usonic.UltrasonicSensor(4, 3);

                assert.strictEqual(ultrasonicSensor.getDistanceCm(), 1);
            });

            it('should return -1', function () {
                var ultrasonicSensor = new usonic.UltrasonicSensor(3, 4);

                assert.strictEqual(ultrasonicSensor.getDistanceCm(), -1);
            });
        });
    });
});
