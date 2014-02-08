'use strict';

module.exports = function (grunt) {
  grunt.initConfig({

    HOSTNAME: process.env.HOSTNAME || '127.0.0.1',
    PORT: process.env.PORT || 3000,

    jshint: {
      all: 'cheet.js'
    },

    uglify: {
      options: {
        mangle: false
      },
      js: {
        files: {
          'cheet.min.js': 'cheet.js'
        }
      }
    },

    mocha_phantomjs: {
      options: {
        reporter: 'dot'
      },
      all: 'tests/index.html'
    },

    connect: {
      options: {
        port: '<%= PORT %>',
        hostname: '<%= HOSTNAME %>',
        keepalive: true,
        base: './'
      },
      test: {
      },
      open: {
        options: {
          open: {
            target: 'http://<%= HOSTNAME %>:<%= PORT %>/tests'
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mocha-phantomjs');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint', 'uglify']);
  grunt.registerTask('test', ['jshint', 'mocha_phantomjs']);
  grunt.registerTask('test.open', ['connect:open']);
};
