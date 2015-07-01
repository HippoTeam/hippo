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
        },
        module: {
          loaders: []
        }
      },
      prod: {
        entry: __dirname + '/app/js/client.js',
        output: {
          path: 'prod/',
          file: 'bundle.js'
        },
        module: {
          loaders: []
        }
      },
      test: {
        entry: __dirname + '/test/client/test.js',
        output: {
          path: 'test/client/',
          file: 'test_bundle.js'
        },
        module: {
          loaders: []
        }
      },
      karma_test: {
        entry: __dirname + '/test/karma_tests/test_entry.js',
        output: {
          path: 'test/karma_tests/',
          file: 'bundle.js'
        },
        module: {
          loaders: []
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
      },
      prod: {
        cwd: 'app/',
        expand: true,
        flatten: false,
        src: '**/*.html',
        dest: 'prod/',
        filter: 'isFile'
      }
    },

    clean: {
      dev: {
        src: 'build/'
      },
      prod: {
        src: 'prod/'
      }
    },

    jshint: {
      server: {
        src: ['./lib/**/*.js',
              './models/**/*.js',
              './routes/**/*.js',
              './test/*test.js',
              '*.js'
             ],
        options: {
          globals: {
            describe: true,
            it: true,
            before: true,
            after: true,
            beforeEach: true,
            afterEach: true
          }
        }
      },

      client: {
        src: ['app/**/*.js',
              'test/client/*test.js'
              ],
        options: {
          globals: {
            angular: true,
            describe: true,
            it: true,
            before: true,
            after: true,
            document: true
          }
        }
      },

      karma: {
        src: ['test/karma_tests/*test.js'],
        options: {
          globals: {
            angular: true,
            describe: true,
            it: true,
            expect: true,
            before: true,
            after: true,
            beforeEach: true,
            afterEach: true
          }
        }
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
  grunt.registerTask('build:dev', ['jshint:client', 'webpack:client', 'copy:html'     ]);
  grunt.registerTask('karmatest', ['jshint:karma', 'webpack:karma_test', 'karma:test' ]);
  grunt.registerTask('mocharun',  ['jshint:dev', 'mochaTest'                          ]);
  grunt.registerTask('test',      ['jshint', 'karmatest', 'mochaTest'                 ]);
  grunt.registerTask('build',     ['build:dev'                                        ]);
  grunt.registerTask('build:prod',['webpack:prod', 'copy:prod'                        ]);
  grunt.registerTask('default',   ['test'                                             ]);
};
