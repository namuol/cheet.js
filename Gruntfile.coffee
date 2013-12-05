module.exports = (grunt) ->
  config =
    HOSTNAME: process.env.HOSTNAME || '127.0.0.1'
    PORT: process.env.PORT || 3000

    watch:
      options:
        livereload: true
      jade:
        files: 'src/**/*.jade'
        tasks: ['jade', 'markdown']
      md:
        files: 'src/**/*.md'
        tasks: ['markdown']
      statics:
        files: [
          '**/*.html'
          '**/*.css'
          '**/*.js'
        ]

    jade:
      build:
        options:
          format: true
        expand: true
        cwd: 'src'
        src: '**/*.jade'
        dest: 'src'
        ext: '.html.jst'

    markdown:
      readme:
        files:
          'index.html': 'src/README.md'
        options:
          template: 'src/index.html.jst'
          markdownOptions:
            highlight: 'manual'
            gfm: true

    connect:
      server:
        options:
          port: '<%= PORT %>'
          hostname: '<%= HOSTNAME %>'
          base: './'
          livereload: true

    open:
      hack:
        path: 'http://<%= HOSTNAME %>:<%= PORT %>'

  grunt.initConfig config

  grunt.loadNpmTasks 'grunt-contrib-jade'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-markdown'
  grunt.loadNpmTasks 'grunt-open'

  grunt.registerTask 'default', ['jade', 'markdown']
  grunt.registerTask 'hack', ['connect:server', 'open:hack', 'watch']
