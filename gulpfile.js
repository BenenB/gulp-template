"use strict";

// Load plugins
const gulp = require("gulp");
const fileinclude = require('gulp-file-include');



const paths = {
  scripts: {
    src: './',
    partials: './_partials/',
    node_modules: './node_modules/',
    dest: './_site/'
  }
};


function html() {

  // define where we want to grab files from
  var src_arr = [
    './**/*.html', // any html in the root folder or any of the subfolders
    '!' + paths.scripts.dest + '**', // except the paths we specify here
    '!' + paths.scripts.node_modules + '**',
    '!' + paths.scripts.partials + '**'
  ];

  
  console.log("Starting html...");
  
  return gulp.src(src_arr) 
    .pipe(fileinclude({ // here we call the fileinclude plugin
      prefix: '@@', // defining the symbol it needs to look for
      basepath: paths.scripts.partials // as well as where to look for the files to include
    }))
    .pipe(gulp.dest(paths.scripts.dest)); // pipe the output to the destination folder

}


//the rest of the functions are very similar but for the differient file types
//there really won't be any need to create partials for js files so we aren't calling the fileinclude plugin
//instead we are just copying what's in there into the output folder 
function js() {

  var files = [
    './js/**/*'
  ];
  console.log("Copying '" + files + "' to '" + paths.scripts.dest + "'");

  return gulp.src(files, { base: './' })
    .pipe(gulp.dest(paths.scripts.dest));
}

function css() {

  var files = [
    './css/**/*'
  ];
  console.log("Copying '" + files + "' to '" + paths.scripts.dest + "'");

  return gulp.src(files, { base: './' })
    .pipe(gulp.dest(paths.scripts.dest));
}

function static_assets() {

  //static assets will be for anything else that we need to copy over to the final site
  //this could be images, downloadable documents, json files etc...
  //we just add more files/folders to the below array
  var files = [
    './img/**/*'
  ];
  console.log("Copying '" + files + "' to '" + paths.scripts.dest + "'");

  return gulp.src(files, { base: './' })
    .pipe(gulp.dest(paths.scripts.dest));
}


// Define our task as a combination of the functions above
const build = gulp.series(html, js, css, static_assets);

// Export our task under the name build, but also as the default
exports.build = build;
exports.default = build;
