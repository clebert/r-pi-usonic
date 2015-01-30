/* global beforeEach, describe, it */

'use strict';

var assert       = require('expressive-assertion');
var mock         = require('node-mock');
var nativeUsonic = mock.require('../build/Release/usonic.node', __dirname, {});
var usonic       = require('../lib/usonic.js');
var ts           = require('typesystem');

describe('usonic', function () {
    beforeEach(function () {
        nativeUsonic.getDistance = function () {};
    });

    describe('.createSensor()', function () {
        it('returns a sensor function', function () {
            assert(function () {
                return ts.isFunction(usonic.createSensor(0, 0));
            }, function () {
                return ts.isFunction(usonic.createSensor(0, 0, null));
            }, function () {
                return ts.isFunction(usonic.createSensor(0, 0, undefined));
            }, function () {
                return ts.isFunction(usonic.createSensor(0, 0, 500));
            }, function () {
                return ts.isFunction(usonic.createSensor(53, 53));
            }, function () {
                return ts.isFunction(usonic.createSensor(53, 53, null));
            }, function () {
                return ts.isFunction(usonic.createSensor(53, 53, undefined));
            }, function () {
                return ts.isFunction(usonic.createSensor(53, 53, 500));
            });
        });

        it('throws an assertion error', function () {
            assert.throws(function () {
                usonic.createSensor();
            }, function (exception) {
                return exception.name === 'AssertionError';
            }, function (exception) {
                return /ts\.isInteger\(value\) && value >= 0 && value <= 53/.test(exception);
            });

            assert.throws(function () {
                usonic.createSensor(0);
            }, function (exception) {
                return exception.name === 'AssertionError';
            }, function (exception) {
                return /ts\.isInteger\(value\) && value >= 0 && value <= 53/.test(exception);
            });

            assert.throws(function () {
                usonic.createSensor(0, 0, NaN);
            }, function (exception) {
                return exception.name === 'AssertionError';
            }, function (exception) {
                return /ts\.isInteger\(value\) && value > 0/.test(exception);
            });
        });
    });

    describe('sensor()', function () {
        it('calls nativeUsonic.getDistance() once with the given echoPin, triggerPin and with the default timeout', function () {
            var called = 0;

            nativeUsonic.getDistance = function (echoPin, triggerPin, timeout) {
                assert(function () {
                    return echoPin === 0;
                }, function () {
                    return triggerPin === 53;
                }, function () {
                    return timeout === 750;
                });

                called += 1;
            };

            usonic.createSensor(0, 53)();
            usonic.createSensor(0, 53, null)();
            usonic.createSensor(0, 53, undefined)();

            assert(function () {
                return called === 3;
            });
        });

        it('calls nativeUsonic.getDistance() once with the given echoPin, triggerPin and timeout', function () {
            var called = 0;

            nativeUsonic.getDistance = function (echoPin, triggerPin, timeout) {
                assert(function () {
                    return echoPin === 53;
                }, function () {
                    return triggerPin === 0;
                }, function () {
                    return timeout === 500;
                });

                called += 1;
            };

            usonic.createSensor(53, 0, 500)();

            assert(function () {
                return called === 1;
            });
        });

        it('returns the returned value from nativeUsonic.getDistance() call', function () {
            nativeUsonic.getDistance = function () {
                return -1;
            };

            assert(function () {
                return usonic.createSensor(0, 53)() === -1;
            });
        });
    });
});
