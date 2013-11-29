module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-closure-compiler');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.initConfig({
            // grunt-closure-compiler https://github.com/gmarty/grunt-closure-compiler
            'closure-compiler': {
                frontend: {
                    closurePath: 'tools/closure',
                    js: 'app/calc.js',
                    jsOutputFile: 'dist/calc.js',
                    maxBuffer: 500,
                    options: {
                        compilation_level: 'ADVANCED_OPTIMIZATIONS',
                        language_in: 'ECMASCRIPT5_STRICT'
                    }
                }
            },
            // grunt-contrib-cssmin vice na https://github.com/gruntjs/grunt-contrib-cssmin
            cssmin: {

                minify: {
                    files: {
                        'dist/style.css': 'app/style.css'
                    }
                }
            },
            // Task htmlmin https://github.com/gruntjs/grunt-contrib-htmlmin
            htmlmin: {
                dist: { // Target
                    options: { // Target options
                        removeComments: true,
                        collapseWhitespace: true
                    },
                    files: { // Dictionary of files
                        'dist/index.html': 'app/index.html' // 'destination': 'source'
                    }
                }
            },
            watch: { // Watch https://github.com/gruntjs/grunt-contrib-watch
                scripts: {
                    files: ['Gruntfile.js', 'app/*.js'],
                    tasks: ['build'],
                    options: {
                        spawn: false,
                    },
                },
            },
            // grunt-contrib-jshint pro statickou kontrolu https://github.com/gruntjs/grunt-contrib-jshint
            jshint: {
                ignore_warning: {
                    options: {
                        '-W061': true,
                    },
                    all: ['Gruntfile.js', 'app/*.js']
                }
            }    
            });

        // Build task.
        grunt.registerTask('build', [
            'jshint',
            'closure-compiler',
            'cssmin',
            'htmlmin'
        ]);

        // Default task.
        grunt.registerTask('default', ['watch']);


    };
