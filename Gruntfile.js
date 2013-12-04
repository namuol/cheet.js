'use strict';

module.exports = function (grunt) {
  grunt.initConfig({

    HOSTNAME: process.env.HOSTNAME || '127.0.0.1',
    PORT: process.env.PORT || 3000,

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
        keepalive: true
      },
      test: {
        options: {
          base: './'
        }
      }
    },

    open: {
      test: {
        path: 'http://<%= HOSTNAME %>:<%= PORT %>/tests'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mocha-phantomjs');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('test', ['mocha_phantomjs']);
  grunt.registerTask('test.open', ['open:test', 'connect:test']);
};
