module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-closure-compiler');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.initConfig({
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
        cssmin: {
            // grunt-contrib-cssmin vice na https://github.com/gruntjs/grunt-contrib-cssmin
            minify: {
                files: {
                    'dist/style.css': 'app/style.css'
                }
            }
        },
        htmlmin: { // Task htmlmin https://github.com/gruntjs/grunt-contrib-htmlmin
            dist: { // Target
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: { // Dictionary of files
                    'dist/index.html': 'app/index.html' // 'destination': 'source'
                }
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', [
        'closure-compiler',
        'cssmin',
        'htmlmin'
    ]);

};
