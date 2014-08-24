/* global beforeEach, describe, it */

'use strict';

var assert = require('extended-assert');
var mock   = assert.requireFileMock(__dirname, '../build/Release/usonic.node', {});
var usonic = require('../lib/usonic');

describe('usonic', function () {
    beforeEach(function () {
        mock.getDistance = function () {};
    });

    describe('.sensor()', function () {
        it('returns a function', function () {
            assert.strictEqual(typeof usonic.sensor(0, 0), 'function');
            assert.strictEqual(typeof usonic.sensor(0, 0, 1), 'function');
            assert.strictEqual(typeof usonic.sensor(0, 0, 2147483647), 'function');

            assert.strictEqual(typeof usonic.sensor(0, 53), 'function');
            assert.strictEqual(typeof usonic.sensor(0, 53, 1), 'function');
            assert.strictEqual(typeof usonic.sensor(0, 53, 2147483647), 'function');

            assert.strictEqual(typeof usonic.sensor(53, 0), 'function');
            assert.strictEqual(typeof usonic.sensor(53, 0, 1), 'function');
            assert.strictEqual(typeof usonic.sensor(53, 0, 2147483647), 'function');

            assert.strictEqual(typeof usonic.sensor(53, 53), 'function');
            assert.strictEqual(typeof usonic.sensor(53, 53, 1), 'function');
            assert.strictEqual(typeof usonic.sensor(53, 53, 2147483647), 'function');
        });

        it('throws a type error', function () {
            assert.throwsError(function () {
                usonic.sensor();
            }, 'TypeError', 'Illegal argument: undefined');

            assert.throwsError(function () {
                usonic.sensor(NaN);
            }, 'TypeError', 'Illegal argument: null');

            assert.throwsError(function () {
                usonic.sensor(1.5);
            }, 'TypeError', 'Illegal argument: 1.5');

            assert.throwsError(function () {
                usonic.sensor(-1);
            }, 'TypeError', 'Illegal argument: -1');

            assert.throwsError(function () {
                usonic.sensor(54);
            }, 'TypeError', 'Illegal argument: 54');

            assert.throwsError(function () {
                usonic.sensor(0);
            }, 'TypeError', 'Illegal argument: undefined');

            assert.throwsError(function () {
                usonic.sensor(0, NaN);
            }, 'TypeError', 'Illegal argument: null');

            assert.throwsError(function () {
                usonic.sensor(0, 1.5);
            }, 'TypeError', 'Illegal argument: 1.5');

            assert.throwsError(function () {
                usonic.sensor(0, -1);
            }, 'TypeError', 'Illegal argument: -1');

            assert.throwsError(function () {
                usonic.sensor(0, 54);
            }, 'TypeError', 'Illegal argument: 54');

            assert.throwsError(function () {
                usonic.sensor(0, 0, NaN);
            }, 'TypeError', 'Illegal argument: null');

            assert.throwsError(function () {
                usonic.sensor(0, 0, 1.5);
            }, 'TypeError', 'Illegal argument: 1.5');

            assert.throwsError(function () {
                usonic.sensor(0, 0, 0);
            }, 'TypeError', 'Illegal argument: 0');
        });
    });

    describe('sensor()', function () {
        it('calls native usonic.getDistance() once with the given echoPin, triggerPin and with the default timeout', function () {
            var called = 0;

            mock.getDistance = function (echoPin, triggerPin, timeout) {
                assert.strictEqual(echoPin, 0);
                assert.strictEqual(triggerPin, 53);
                assert.strictEqual(timeout, 750);

                called += 1;
            };

            usonic.sensor(0, 53)();

            assert.strictEqual(called, 1);
        });

        it('calls native usonic.getDistance() once with the given echoPin, triggerPin and timeout', function () {
            var called = 0;

            mock.getDistance = function (echoPin, triggerPin, timeout) {
                assert.strictEqual(echoPin, 0);
                assert.strictEqual(triggerPin, 53);
                assert.strictEqual(timeout, 450);

                called += 1;
            };

            usonic.sensor(0, 53, 450)();

            assert.strictEqual(called, 1);
        });

        it('returns a number value', function () {
            mock.getDistance = function () {
                return -1;
            };

            assert.strictEqual(usonic.sensor(0, 53)(), -1);
        });
    });
});
