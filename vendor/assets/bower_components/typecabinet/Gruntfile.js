module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    'gh-pages': {
      options: {
        base: 'site'
      },
      src: '**/*'
    },
    'watch': {
      sass: {
        files: ['./dist/**/*'],
        tasks: ['copy'],
        options: {
          nospawn: true
        }
      },
      site: {
        files: ['./site/scss/**/*'],
        tasks: ['sass'],
        options: {
          nospawn: true
        }
      },
      md: {
        files: ['./site/**/*'],
        tasks: ['markdown'],
        options: {
          nospawn: true
        }
      },
    },
    'sass': {
      site: {
        files: {
          'site/css/style.css' : 'site/scss/style.scss',
        },
        options: {
          loadPath: [
            'dist/',
            'site/scss/lib/viewport-grid/lib/'
          ],
          lineNumbers: true
        }
      },
    },
    'copy': {
      dist: {
        files: [
          {expand: true, src: ['dist/*'], dest: 'site/scss/lib/typecabinet', filter: 'isFile'},
        ]
      }
    },
    'connect': {
      'static': {
        options: {
          base: 'site/',
          hostname: 'localhost',
          port: 8001
        }
      }
    },
    'markdown': {
      index: {
        files: [
          {
            expand: true,
            src: 'site/index.md',
            dest: './',
            ext: '.html'
          },
        ],
        options: {
          template: 'site/layout.html',
          markdownOptions: {
            gfm: true,
            highlight: 'manual'
          }
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-markdown');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('build', ['markdown', 'copy', 'sass']);
  grunt.registerTask('develop', ['connect', 'build', 'watch']);
  grunt.registerTask('deploy', ['build', 'gh-pages']);
  grunt.registerTask('default', ['develop']);

};
