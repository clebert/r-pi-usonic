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
                    '!node_modules/**/*.js'
                ]
            },
            'lint-json': {
                src: [
                    '**/*.json',
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
        }
    });

    grunt.loadNpmTasks('grunt-bumpup');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-module');

    grunt.registerTask('default', [
        'jshint:lint-js',
        'jshint:lint-json'
    ]);

    grunt.registerTask('publish', function (type) {
        grunt.task.run('default');
        grunt.task.run('module:check-repository');
        grunt.task.run('bumpup:' + (type || 'patch'));
        grunt.task.run('module:license-copyright');
        grunt.task.run('module:release-publish');
    });
};
