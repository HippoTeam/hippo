'use strict';

module.exports = function(grunt) {

  // Loaded Tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test'    );
  grunt.loadNpmTasks('grunt-webpack'    );
  grunt.loadNpmTasks('grunt-contrib-copy'    );
  grunt.loadNpmTasks('grunt-contrib-clean'    );

  // Task Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    webpack: {
      client: {
        entry: __dirname + '/app/js/client.js',
        output: {
          path: 'build/',
          file: 'bundle.js'
        }
      },
      test: {
        entry: __dirname + '/test/client/test.js',
        output: {
          path: 'test/client/',
          file: ' test_bundle.js'
        }
      }
    },

    copy: {
      html: {
        cwd: 'app/',
        expand: true,
        flatten: false,
        src: '**/*.html',
        dest: 'build/',
        filter: 'isFile'
      }
    },

    clean: {
      dev: {
        src: 'build/'
      }
    },

    jshint: {
      dev: {
        src: ['Gruntfile.js',
              '/models/**/*.js',
              '/routes/**/*.js',
              '/test/**/*.js',
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
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: false,
          quiet: false,
          clearRequireCache: false
        },
        src: ['test/*_test.js']
      }
    }
  });

  // Registered Tasks
  grunt.registerTask('build:dev', ['webpack:client', 'copy:html']);
  grunt.registerTask('build', ['build:dev']);
  grunt.registerTask('test',    ['jshint:dev', 'mochaTest']);
  grunt.registerTask('default', ['test'    ]);
};
