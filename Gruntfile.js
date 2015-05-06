/*jshint node:true */

'use strict';

require('sugar');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    env: process.env.NODE_ENV,

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= env %> <%= grunt.template.today("yyyymmdd") %> */\n',
        report: 'min'
      }
    },


    clean: {
      build: ['build']
    },


    stylus: {
      compile: {
        options: {
          linenos: false,
        },
        files: {
          'assets/css/style.css': 'assets/css/style.styl'
        }
      }
    },


    copy: {
      statics: {
        files: [
          { expand: true, src: ['assets/font/**', 'assets/js/**', 'assets/img/**', 'assets/css/**', 'global.js'], dest: 'build/' },
        ]
      },
    },


    browserify: {
      app: {
        files: {'build/app.js': ['./app.jsx', './lib/*', './models/*', './components/**/*.js']},
        options: {
          transform: ['reactify']
        }
      },

      options: {
        basedir: __dirname,
        debug: false,
        detectGlobals: true,
      },
    },


    manifest: {
      generate: {
        src: ['app.js',  'global.js', 'index.html', 'assets/img/**', 'assets/css/**/*.css', 'assets/js/**'],
        dest: 'build/manifest.appcache',
        options: {
          basePath: 'build',
          timestamp: true,
        },
      }
    },


    useref: {
      html: 'build/*.html',
      temp: 'build'
    },


    processhtml: {
      options: {
        commentMarker: 'preprocess',
        data: {
          version: 'prod',
          build_date: '' + new Date().toISOString(),
        }
      },
      prod: {
        files: {
          'build/index.html': ['index.html']
        }
      }
    },


    ver: {
      all: {
        versionFile: 'build/versions.json',
        phases: [
          { files: ['build/assets/img/*.jpg', 'build/assets/img/*.png'], references: ['build/assets/css/style.css', 'build/index.html', 'build/app.min.js', 'build/manifest.appcache'] },
          { files: ['build/app.min.js', 'build/assets/css/style.css'], references: ['build/index.html', 'build/manifest.appcache'] }
        ]
      }
    },


    connect: {
      dev: {
        options: {
          port: process.env.PORT || 3100,
          protocol: 'http',
          hostname: '*',
          base: '.',
          middleware: function(connect, options, middlewares) {

            middlewares.push(function (req, res, next) {
              if (!req.url.endsWith(/\.([a-z]+)/)) {
                require('fs').createReadStream(__dirname + '/index.html').pipe(res);
              } else {
                next();
              }
            });

            return middlewares;
          },
        }
      },
      prod: {
        options: {
          port: process.env.PORT || 3100,
          protocol: 'http',
          hostname: '*',
          base: 'build',
          middleware: function(connect, options, middlewares) {

            middlewares.push(function (req, res, next) {
              if (!req.url.endsWith(/\.([a-z]+)/)) {
                require('fs').createReadStream(__dirname + '/index.html').pipe(res);
              } else {
                next();
              }
            });

            return middlewares;
          },
        }
      }
    },


    'closure-compiler': {
      frontend: {
        closurePath: __dirname + '/closure',
        js: 'build/app.js',
        jsOutputFile: 'build/app.min.js',
        maxBuffer: 500,
        options: {
          compilation_level: 'SIMPLE_OPTIMIZATIONS',
          language_in: 'ECMASCRIPT5_STRICT',
        }
      }
    },


    watch: {
      css: {
        files: ['assets/**/*.styl', '**/*.html'],
        tasks: ['stylus:compile'],
      },
      js: {
        files: ['components/**/*', 'lib/**/*', 'models/**/*', 'global.js', 'app.jsx', "config/*.json"],
        tasks: ['browserify:app'],
      },
      bundle: {
        files: ['build/app.min.js'],
        tasks: [],
        options: {
          livereload: true,
        }
      },
      options: {
        interrupt: true,
        spawn: true
      }
    },


    concurrent: {
      watch: {
        tasks: [
          'watch:css',
          'watch:js',
          'watch:bundle'
        ],
        options: {
          logConcurrentOutput: true,
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-ver');
  grunt.loadNpmTasks('grunt-useref');
  grunt.loadNpmTasks('grunt-manifest');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-closure-compiler');

  grunt.registerTask('_copy', ['copy:statics']);
  grunt.registerTask('_douseref', ['useref:html', 'concat', 'uglify']);
  grunt.registerTask('_versioning', ['manifest:generate', 'ver']);

  grunt.registerTask('bundle', [
    'clean:build',
    'stylus:compile',
    'processhtml:prod',
    '_copy',
    'browserify:app',
    'closure-compiler:frontend',
    '_versioning' // keep as last
  ]);

  grunt.registerTask('prod', ['bundle', 'connect:prod', 'concurrent:watch']);

  grunt.registerTask('dev', [
    'clean:build',
    'stylus:compile', // first time compile
    '_copy',
    'connect:dev',
    'browserify:app',
    'concurrent:watch',
  ]);

};
