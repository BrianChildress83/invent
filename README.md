# Invent Framework (invent frame)

UI Framework and Angular App for Invent

- [Gulp instructions](#gulp)
- [Documentation](#documentation)
- [Technologies used](#technologies)
- [Contributing](#contributing)
- [Versioning](#versioning)

## Gulp instructions

- Below is an example GULP tutorial
- This tutorial can be found at: https://laracasts.com/lessons/gulp-this


   * Gulp works

      * by splitting everything into various plugins



   * install Gulp

      * sudo npm install -g gulp

   * install Gulp into project dependencies

      * create a package.json file

         * vi package.json

            * make an empty object

               * {  }

                  * :x (to exit)


   * install gulp and save it to your dev dependencies

      * sudo npm install gulp —save-dev

   * ls
   * cat package.json

      * get this:

         * {
  "devDependencies": {
    "gulp": "^3.6.1"
  }
}

   * Install plugins

      * 


         * 


      * minifying css

         * sudo npm install gulp-minify-css —save-dev

      * * You can get more on Gulp’s website

   * turn everything into a task

      * sudo vi gulpfile.js

   * pull in all modules installed

      * create first gulp task (piping)


               var gulp = require(‘gulp’);
               var minifycss = require(‘gulp-minify-css’);


               gulp.task(‘css’,function(){
                    return gulp.src(‘css/main.css’)
                         .pipe(minifycss())
                         .pipe(gulp.dest(‘css/min’));
               });




   * Create 

      * main.css (with some same code)

   * in terminal

      * gulp (this won’t work because we didn’t spec. a task)
      * so for now just trigger the name of the task

         * gulp css


   * automate

      * in gulpfile.js


gulp.task(‘default’, function(){
     gulp.run(‘css’);
    
     // set up watcher
     gulp.watch('css/*.css', function(){
          gulp.run('css');
     });
});



   * now run:

      * gulp (in terminal) and it’ll watch

   * Auto prefixed plugin (for Vendor prefixes)

      * npm install gulp-autoprefixer —save-dev

   * pull it into Gulp file

      * var autoprefixer = require(‘gulp-autoprefixer’);

   * Then pipe it through

      * .pipe(autoprefixer());

   * Can modify prefixing quite a bit

      * only want to target certain browsers etc

         * .pipe(autoprefixer(‘last 15 version'));


   * install Notify plugin (to see notifications on Mac)

      * npm install gulp-notify —save-dev

   * in guplfile.js

      * var notify = require(‘gulp-notify’);
      * and (at the end)
      * .pipe(notify{message: ‘All done, master!’ }));

   * install SCSS

      * npm install gulp-ruby-sass —save-dev

   * in guplfile.js


      * var sass = require(‘gulp-ruby-sass’);

      * and (at the beginning)
      * .pipe(sass({ style: ‘compressed’ }));


         * // take out the minified

      * now replace this:

         * return gulp.src('css/main.css’)

         * with this:

            * return gulp.src('css/main.sass’)


      * now replace this:

         * .pipe(gulp.dest('css/min’))

         * with this:

            * .pipe(gulp.dest(‘css’))



      * now replace this:

         * gulp.watch('css/*.css',function(){     

         * with this:

            * gulp.watch('sass/**/*.sass',function(){     

         * Should look like this

            * *** Changed “run” because it’s 

               * gulpfile.js (** took out “run” due to deprecation … changed to “watch”)
               * var gulp = require('gulp'),
     minifycss = require('gulp-minify-css'),
     autoprefixer = require('gulp-autoprefixer'),
     notify = require('gulp-notify'),
     sass = require('gulp-ruby-sass');

//=== Gulp task
gulp.task('css', function() {
  return gulp.src('sass/main.scss')
       .pipe(sass({ style:'compressed' }))
       .pipe(autoprefixer())
       /* .pipe(minifycss()) */
       .pipe(gulp.dest('css'))
       .pipe(notify("Done with CSS"));
});

//=== Gulp Automate
gulp.task('watch', function() {
     // gulp.run('css');

     //set watcher
     gulp.watch('sass/**/*.scss', ['css']);
});

gulp.task('default', ['watch']);


                  * package.json

                     * {
  "devDependencies": {
    "gulp": "^3.8.5",
    "gulp-minify-css": "^0.3.6",
    "gulp-autoprefixer": "0.0.8",
    "gulp-notify": "^1.4.0",
    "gulp-ruby-sass": "^0.5.0"
  }
}

## Documentation

<!--This framwork's documentation, included in this repo in the root directory, is built with [Jekyll](http://jekyllrb.com).-->

### Running documentation locally

<!-- 1. If necessary, [install Jekyll](http://jekyllrb.com/docs/installation) (requires v2.1.x).
  - **Windows users:** Read [this unofficial guide](https://github.com/juthilo/run-jekyll-on-windows/) to get Jekyll up and running without problems. We use Pygments for syntax highlighting, so make sure to read the sections on installing Python and Pygments.
2. From the root `/invent-framework` directory, run `jekyll serve` in the command line.
3. Open <http://localhost:9001> in your browser.

Learn more about using Jekyll by reading its [documentation](http://jekyllrb.com/docs/home/).
 -->

## Technologies used
<!-- 
This will document all the third-party code we use. So far, this includes:

- Bootstrap SASS version (currently version 3.2)
- Foundation (CSS/JS framework -- using only select elements from this)
- Modernizr (Feature detection library and HTML5 polyfill)
- Bourbon (SASS mixins)
- Selectivizr (IE8 support)
- Respond.js (IE8 support) 
- FastClick (JS lib that eliminates delay on click for mobile devices)
- FontAwesome (Icon font library)
 -->

## Contributing
<!-- 
Please read through our [contributing guidelines](https://github.com/michaelbowlin/invent-framework/CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.

Editor preferences are available in the [editor config](https://github.com/michaelbowlin/invent-framework/.editorconfig) for easy use in common text editors. Read more and download plugins at <http://editorconfig.org>.
 -->

## Versioning

<!-- For transparency into our release cycle and in striving to maintain backward compatibility, this framework is maintained under [the Semantic Versioning guidelines](http://semver.org/). -->


Blockquotes
========

> Email-style angle brackets
> are used for blockquotes.

> > And, they can be nested.

> #### Headers in blockquotes
> 
> * You can quote a list.
> * Etc.


