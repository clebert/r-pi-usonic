/* global beforeEach, describe, it */

'use strict';

var assert = require('extended-assert');
var mock = assert.requireFileMock(__dirname, '../build/Release/usonic.node', {});
var usonic = require('../lib/usonic');

describe('usonic', function () {
    beforeEach(function () {
        mock.getDistanceCm = function () {};
    });

    describe('.sensor()', function () {
        it('throws an error', function () {
            var message = 'Illegal argument: echoPin';

            assert.throwsError(function () {
                usonic.sensor();
            }, 'Error', message);

            assert.throwsError(function () {
                usonic.sensor(NaN);
            }, 'Error', message);

            assert.throwsError(function () {
                usonic.sensor(-1);
            }, 'Error', message);

            assert.throwsError(function () {
                usonic.sensor(54);
            }, 'Error', message);

            message = 'Illegal argument: triggerPin';

            assert.throwsError(function () {
                usonic.sensor(0);
            }, 'Error', message);

            assert.throwsError(function () {
                usonic.sensor(0, NaN);
            }, 'Error', message);

            assert.throwsError(function () {
                usonic.sensor(0, -1);
            }, 'Error', message);

            assert.throwsError(function () {
                usonic.sensor(0, 54);
            }, 'Error', message);
        });

        it('returns a function', function () {
            assert.strictEqual(typeof usonic.sensor(0, 0), 'function');
            assert.strictEqual(typeof usonic.sensor(0, 53), 'function');
            assert.strictEqual(typeof usonic.sensor(53, 0), 'function');
            assert.strictEqual(typeof usonic.sensor(53, 53), 'function');
        });
    });

    describe('sensor()', function () {
        it('calls native usonic.getDistanceCm() once with the given echoPin and triggerPin', function () {
            var called = 0;

            mock.getDistanceCm = function (echoPin, triggerPin) {
                assert.strictEqual(echoPin, 0);
                assert.strictEqual(triggerPin, 53);

                called += 1;
            };

            usonic.sensor(0, 53)();

            assert.strictEqual(called, 1);
        });

        it('returns a number value', function () {
            mock.getDistanceCm = function () {
                return -1;
            };

            assert.strictEqual(usonic.sensor(0, 53)(), -1);
        });
    });
});
