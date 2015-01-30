'use strict';

var blanket = require('blanket');
var tasks   = require('load-grunt-tasks');
var time    = require('time-grunt');

module.exports = function (grunt) {
    time(grunt);
    tasks(grunt);

    blanket({
        'data-cover-only': 'lib/',
        'data-cover-never': 'node_modules/'
    });

    grunt.initConfig({
        bumpup: {
            options: {
                newlineEof: true
            },
            file: 'package.json'
        },
        coveralls: {
            src: 'test/lcov.info'
        },
        jscs: {
            options: {
                config: '.jscsrc'
            },
            src: [
                '**/*.js',
                '!node_modules/**/*.js'
            ]
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            src: [
                '**/*.js',
                '**/*.json',
                '!node_modules/**/*.js',
                '!node_modules/**/*.json'
            ]
        },
        mochaTest: {
            options: {
                colors: true,
                ui: 'bdd'
            },
            spec: {
                options: {
                    reporter: 'spec'
                },
                src: 'test/*.test.js'
            },
            'html-cov': {
                options: {
                    captureFile: 'test/coverage.html',
                    quiet: true,
                    reporter: 'html-cov'
                },
                src: 'test/*.test.js'
            },
            'console-cov': {
                options: {
                    reporter: 'mocha-cov-reporter'
                },
                src: 'test/*.test.js'
            },
            'lcov-cov': {
                options: {
                    captureFile: 'test/lcov.info',
                    quiet: true,
                    reporter: 'mocha-lcov-reporter'
                },
                src: 'test/*.test.js'
            }
        },
        module: {
            'check-repository': {
                options: {
                    branch: 'master',
                    check: true
                }
            },
            'release-publish': {
                options: {
                    release: true,
                    publish: true
                }
            }
        }
    });

    grunt.registerTask('test', [
        'jscs',
        'jshint',
        'mochaTest:spec',
        'mochaTest:html-cov',
        'mochaTest:console-cov',
        'mochaTest:lcov-cov'
    ]);

    grunt.registerTask('publish', function (type) {
        grunt.task.run('test');
        grunt.task.run('module:check-repository');
        grunt.task.run('bumpup:' + type);
        grunt.task.run('module:release-publish');
    });

    grunt.registerTask('travis', [
        'test',
        'coveralls'
    ]);

    grunt.registerTask('default', 'test');
};
