'use strict';

module.exports = function(grunt) {

  // Loaded Tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Task Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      dev: {
        src: ['Gruntfile.js',
              '*.js'
             ],
      },
      options: {
        // Base Options
        eqeqeq: true,
        globals: {},
        maxerr: 20,
        // Environments
        node: true
      }
    }
  });

  // Registered Tasks
  grunt.registerTask('test',    ['jshint:dev']);
  grunt.registerTask('default', ['test'    ]);
};
