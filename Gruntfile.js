'use strict';

module.exports = function(grunt) {

  // Loaded Tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test'    );
  grunt.loadNpmTasks('grunt-webpack'    );
  grunt.loadNpmTasks('grunt-contrib-copy'    );
  grunt.loadNpmTasks('grunt-contrib-clean'    );
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');

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
          file: 'test_bundle.js'
        }
      },
      karma_test: {
        entry: __dirname + '/test/karma_tests/test_entry.js',
        output: {
          path: 'test/karma_tests/',
          file: 'bundle.js'
        }
      }
    },

    karma: {
      test: {
        configFile: 'karma.conf.js'
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
      client: {
        src: ['./app/js/**/*.js'],
        options: {
          globals: {
            angular: true
          }
        }
      },
      dev: {
        src: ['Gruntfile.js',
              '/lib/**/*.js',
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
    },
    watch: {
      files: ['./app/**/*.js', './app/**/*.html'],
      tasks: ['build']
    }
  });

  // Registered Tasks
  grunt.registerTask('foreman',    [                                      ]);
  grunt.registerTask('build:dev',  ['webpack:client', 'copy:html'         ]);
  grunt.registerTask('karmatest',  ['webpack:karma_test', 'karma:test'    ]);
  grunt.registerTask('test',       ['jshint:dev', 'karmatest', 'mochaTest']);
  grunt.registerTask('build',      ['build:dev'                           ]);
  grunt.registerTask('default',    ['test'                                ]);
};
