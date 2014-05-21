'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bumpup: {
            options: {
                updateProps: {
                    pkg: 'package.json'
                }
            },
            file: 'package.json'
        },
        jshint: {
            'lint-js': {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: [
                    '**/*.js',
                    '!build/**/*.js',
                    '!node_modules/**/*.js'
                ]
            },
            'lint-json': {
                src: [
                    '**/*.json',
                    '!build/**/*.json',
                    '!node_modules/**/*.json'
                ]
            }
        },
        module: {
            'check-repository': {
                options: {
                    check: true
                }
            },
            'license-copyright': {
                options: {
                    replace: true,
                    line: 3
                },
                src: 'LICENSE'
            },
            'release-publish': {
                options: {
                    release: true,
                    publish: true
                }
            }
        },
        mochacov: {
            options: {
                colors: true,
                files: 'test/*.test.js',
                ui: 'bdd'
            },
            'test-spec': {
                options: {
                    reporter: 'spec'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-bumpup');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-cov');
    grunt.loadNpmTasks('grunt-module');

    grunt.registerTask('default', [
        'lint',
        'test'
    ]);

    grunt.registerTask('lint', [
        'jshint:lint-js',
        'jshint:lint-json'
    ]);

    grunt.registerTask('test', [
        'mochacov:test-spec'
    ]);

    grunt.registerTask('publish', function (type) {
        grunt.task.run('default');
        grunt.task.run('module:check-repository');
        grunt.task.run('bumpup:' + (type || 'patch'));
        grunt.task.run('module:license-copyright');
        grunt.task.run('module:release-publish');
    });
};
