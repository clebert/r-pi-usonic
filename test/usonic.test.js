/* global beforeEach, describe, it */

'use strict';

var assert = require('extended-assert');
var mock = assert.requireFileMock(__dirname, '../build/Release/usonic.node', {});
var usonic = require('../lib/usonic');

describe('usonic', function () {
    beforeEach(function () {
        mock.getDistance = function () {};
    });

    describe('.sensor()', function () {
        it('throws an illegal argument error: echoPin', function () {
            var message = 'Illegal argument: echoPin';

            assert.throwsError(function () {
                usonic.sensor();
            }, 'Error', message);

            assert.throwsError(function () {
                usonic.sensor(NaN);
            }, 'Error', message);

            assert.throwsError(function () {
                usonic.sensor(1.5);
            }, 'Error', message);

            assert.throwsError(function () {
                usonic.sensor(-1);
            }, 'Error', message);

            assert.throwsError(function () {
                usonic.sensor(54);
            }, 'Error', message);
        });

        it('throws an illegal argument error: triggerPin', function () {
            var message = 'Illegal argument: triggerPin';

            assert.throwsError(function () {
                usonic.sensor(0);
            }, 'Error', message);

            assert.throwsError(function () {
                usonic.sensor(0, NaN);
            }, 'Error', message);

            assert.throwsError(function () {
                usonic.sensor(0, 1.5);
            }, 'Error', message);

            assert.throwsError(function () {
                usonic.sensor(0, -1);
            }, 'Error', message);

            assert.throwsError(function () {
                usonic.sensor(0, 54);
            }, 'Error', message);
        });

        it('throws an illegal argument error: [timeout]', function () {
            var message = 'Illegal argument: [timeout]';

            assert.throwsError(function () {
                usonic.sensor(0, 0, NaN);
            }, 'Error', message);

            assert.throwsError(function () {
                usonic.sensor(0, 0, 1.5);
            }, 'Error', message);

            assert.throwsError(function () {
                usonic.sensor(0, 0, 0);
            }, 'Error', message);

            assert.throwsError(function () {
                usonic.sensor(0, 0, 2147483648);
            }, 'Error', message);
        });

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
    });

    describe('sensor()', function () {
        it('calls native usonic.getDistance() once with the given echoPin, triggerPin and with the default timeout', function () {
            var called = 0;

            mock.getDistance = function (echoPin, triggerPin, timeout) {
                assert.strictEqual(echoPin, 0);
                assert.strictEqual(triggerPin, 53);
                assert.strictEqual(timeout, 450);

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
                assert.strictEqual(timeout, 500);

                called += 1;
            };

            usonic.sensor(0, 53, 500)();

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
