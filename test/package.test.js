/* global describe, it */

'use strict';

var assert = require('expressive-assertion');
var fs     = require('fs');
var path   = require('path');
var pkg    = require('../package.json');

describe('package.json', function () {
    it('defines an existing primary entry point', function () {
        assert(function () {
            return pkg.main === 'lib/usonic.js';
        });

        assert(function () {
            return fs.existsSync(path.join(__dirname, '..', pkg.main));
        });
    });
});
