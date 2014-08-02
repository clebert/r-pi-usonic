/* global describe, it */

'use strict';

var assert = require('extended-assert');
var fs = require('fs');
var pkg = require('../package');
var path = require('path');

describe('package.json', function () {
    it('defines an existing primary entry point', function () {
        assert.strictEqual(pkg.main, 'lib/usonic.js');
        assert.ok(fs.existsSync(path.join(__dirname, '..', pkg.main)));
    });
});
