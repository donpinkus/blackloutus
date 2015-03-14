var repo = 'https://github.com/nikolaswise/project-boilerplate.git';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    'acetate': {
      build: {
        config: 'acetate.conf.js'
      },
      watch: {
        config: 'acetate.conf.js',
        options: {
          watch: true,
          server: true
        }
      }
    },

    'watch': {
      sass: {
        files: ['source/assets/css/**/*'],
        tasks: ['sass']
      },
      img: {
        files: ['source/assets/img/**/*'],
        tasks: ['newer:imagemin']
      }
    },

    // Build site sass
    'sass': {
      expanded: {
        options: {
          style: 'expanded',
          sourcemap: 'none',
          loadPath: 'bower_components'
        },
        files: {
          'build/assets/css/style.css': 'source/assets/css/style.scss'
        }
      }
    },

    // Optimize images
    'imagemin': {
      doc: {
        files: [{
          expand: true,
          cwd: 'source/assets/img',
          src: ['**/*.{png,jpg,svg}'],
          dest: 'build/assets/img/'
        }]
      }
    },

    'gh-pages': {
      options: {
        base: 'build',
        repo: repo
      },
      src: ['**']
    }
  });

  grunt.registerTask('default', ['newer:imagemin', 'sass', 'acetate:watch', 'watch']);
  grunt.registerTask('deploy', ['acetate:build', 'sass', 'newer:imagemin', 'gh-pages']);
};