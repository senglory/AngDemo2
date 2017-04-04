var gulp = require('gulp');
var rimraf = require("rimraf");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var tap = require('gulp-tap');
var foreach = require('gulp-foreach');
var ignore = require('gulp-ignore');
var runSequence = require('run-sequence');
var wait = require('gulp-wait')
var cache = require('gulp-cache');
var gulpFile = require('gulp-file');
var fs = require("fs");

const del = require('del');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig2.json');

var running = true;

var files = [];

//
//
//
var paths = {
    sourceDirectory: "e:/Angular2Starter/VisualStudio2015/SampleAngular2/SampleAngular2",
    node_modules: "./node_modules/",
    webroot: "C:/inetpub/wwwroot/SampleAngular2/"
};

//
//
//
paths.jsFiles = paths.webroot + 'app/**/*.js';
paths.nodeModulesDestination = paths.webroot + "node_modules/";
paths.scriptsDirectory = paths.webroot + "scripts/";
paths.scriptsDirectoryAndFiles = paths.webroot + "scripts/**/*.js";
paths.scriptsFile = paths.webroot + "scripts/scripts.js";

//
//
//
gulp.task("clean:nodemodules", function (cb) {
    console.log('cleaing node modules...');
    return rimraf(paths.nodeModulesDestination, cb);
});

//
//
//
gulp.task("clean:javascriptFiles", function (cb) {
    console.log('cleaning scripts directory...');
    return rimraf(paths.scriptsDirectory, cb);
});

//
//
//
gulp.task("minify:javascriptFiles", function () {

    console.log('create mini files');  

    return gulp.src(paths.jsFiles).pipe(uglify())
          .pipe(replace('templateUrl:', '\r\ntemplateUrl:'))
          .pipe(replace('.component.html"', '.component.html"\r\n'))
          .pipe(replace(".component.html'", ".component.html'\r\n"))         
          .pipe(concat('scripts.js')).pipe(gulp.dest(paths.scriptsDirectory));       
});




//
//
//
gulp.task("minify:injectHtmlIntoJavascriptFiles", function () {

    console.log('inject Html into JavaScript files');

    var fileContent = fs.readFileSync(paths.scriptsFile, "ASCII") + "\r\n";
    var fileContents = fileContent.split("\r\n");
    var rows = fileContents.length;  

    var returnString = "";

    for (var i = 0; i < rows; i++) {          
        var test = fileContents[i].match(/templateUrl.*\"/);
        if (test !== null)
        {
            var fileName = "";
      
            var fileNameMatch = test[0].match(/"(.*?)"/);
            if (fileNameMatch == null) {
                fileNameMatch = test[0].match(/'(.*?)'/);
            }
          
            fileName = fileNameMatch[1];    
            fileName = paths.webroot + fileName;

            console.log(fileName);

            var htmlContent = fs.readFileSync(fileName, "ASCII");
            returnString = returnString + "template: `" + htmlContent.replace("o;?","") + "`";          
        }
        else
        {
            returnString = returnString + fileContents[i];
        }       
    }
    returnString = returnString.replace(/\r\n/g, '');
    return gulpFile('scripts.min.js', returnString, { src: true }).pipe(gulp.dest(paths.scriptsDirectory));

});

//
//
//
gulp.task("copy:nodemodules", function () {

    console.log('copy node modules...');

    gulp.src(paths.node_modules + "@angular/**/*.js").pipe(gulp.dest(paths.nodeModulesDestination + "@angular"));
    gulp.src([paths.node_modules + "es6-shim/*.js", "!**/Gruntfile.js"]).pipe(gulp.dest(paths.nodeModulesDestination + "es6-shim"));
    gulp.src(paths.node_modules + "systemjs/dist/*.js").pipe(gulp.dest(paths.nodeModulesDestination + "systemjs"));
    gulp.src(paths.node_modules + "bootstrap/dist/css/bootstrap.css").pipe(gulp.dest(paths.nodeModulesDestination + "bootstrap"));
    gulp.src(paths.node_modules + "zone.js/dist/**/*.js").pipe(gulp.dest(paths.nodeModulesDestination + "zonejs"));
    gulp.src(paths.node_modules + "reflect-metadata/*.js").pipe(gulp.dest(paths.nodeModulesDestination + "reflect-metadata"));
    gulp.src(paths.node_modules + "systemjs/**/*.js").pipe(gulp.dest(paths.nodeModulesDestination + "systemjs"));  
    return gulp.src(paths.node_modules + "rxjs/**/*.js").pipe(gulp.dest(paths.nodeModulesDestination + "rxjs"));

});


gulp.task('default', function () {

    console.log('default started.');

    runSequence(
        "clean:nodemodules",      
        "clean:javascriptFiles",
        "minify:javascriptFiles",     
        "minify:injectHtmlIntoJavascriptFiles",
        "copy:nodemodules"
    );

    console.log('default completed.');
});

/// <binding />

/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var iisPort = 8081;

var version = "?version=" + Date.now();
console.log(version);

/* settings for systemjs builder */

var foreach = require("gulp-foreach");
var path = require("path");

var Builder = require('systemjs-builder');
var inlineNg2Template = require('gulp-inline-ng2-template');
var appProd = './scripts';
var appDevTemp = './scripts/temp/angular2';

/* settings for HTML injection */

var fs = require("fs");
var LineByLineReader = require('line-by-line');
var gulpFile = require('gulp-file');

/* settings for minification */

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

/* settings for running build */

var runSequence = require('run-sequence');

var source = require("vinyl-source-stream");
var vinylBuffer = require("vinyl-buffer");

gulp.task("injectHTML", function () {

    console.log('injectHTML started');

    var i = 0;

    return gulp.src('application/**/*.js').pipe(foreach(function (stream, file) {

        var name = file.path;
        var fileStream = fs.readFileSync(name, "utf8");


        var fileContents = fileStream.split("\n");
        var rows = fileContents.length;

        var output = "";
        console.log("filename=" + name);

        for (var i = 0; i < rows; i++) {

            var currentLine = fileContents[i];
            var outputLine = currentLine;

            if (currentLine.indexOf('application/') > -1) {
                if (currentLine.indexOf('templateUrl') > -1) {

                    currentLine = currentLine.replace("+ exports.debugVersion", "");

                    var start = currentLine.indexOf("application");
                    var end = currentLine.indexOf(".html");
                    var lengthOfName = end - start;
                    var htmlFileName = "./" + currentLine.substr(start, lengthOfName) + ".html";

                    var comma = currentLine.indexOf(",");

                    try {
                        var htmlContent = fs.readFileSync(htmlFileName, "ASCII");

                        htmlContent = htmlContent.replace('/[\x00-\x1F\x80-\xFF]/', '');
                        htmlContent = htmlContent.replace("o;?", "");
                        htmlContent = htmlContent.replace(/"/g, '\\"');
                        htmlContent = htmlContent.replace(/\r\n/g, '');
                        htmlContent = "\"" + htmlContent + "\"";

                        currentLine = "template: " + htmlContent;
                        if (comma > -1) currentLine = currentLine + ",";
                        outputLine = currentLine;

                    }
                    catch (err) {
                        //console.log(htmlFileName + " not found.")

                    }

                    // var htmlFile = name.replace(".js", ".html");


                    //var fileExists = false;

                    //fs.stat(htmlFileName, function (err, stat) {
                    //    if (err == null) {
                    //        fileExists = true;                          
                    //    } 
                    //});

                    //console.log(htmlFileName + " " + fileExists);



                    //if (fileExists) {
                    //var htmlFileContents = fs.readFileSync(htmlFile, "utf8");
                    //currentLine = currentLine.replace(".html", ".html" + version);
                    //currentLine = currentLine.replace("+ exports.debugVersion", "");
                    //console.log(currentLine);

                    //}

                    //console.log(htmlFileContents);


                }

            }
            output = output + outputLine;
        }


        streams = [];
        var stream = source("inject.js");
        var streamEnd = stream;
        stream.write(output);
        process.nextTick(function () {
            stream.end();
        });

        streamEnd = streamEnd.pipe(vinylBuffer()).pipe(concat(name)).pipe(gulp.dest("./application"));
        return stream;

    }));

    //.pipe(concat('scripts.js')).pipe(gulp.dest(appProd)));

    // return stream
    //.pipe(doSomethingWithEachFileIndividually())
    //.pipe(concat(file.name));
    //));


    //return gulp.src(paths.jsFiles).pipe(uglify())
    //      .pipe(replace('templateUrl:', '\r\ntemplateUrl:'))
    //      .pipe(replace('.component.html"', '.component.html"\r\n'))
    //      .pipe(replace(".component.html'", ".component.html'\r\n"))
    //      .pipe(concat('scripts.js')).pipe(gulp.dest(paths.scriptsDirectory));
});

/** then bundle */
gulp.task('bundleAngular2', function () {

    var builder = new Builder('./', 'systemjs.config.js');
    return builder
      .buildStatic('./application/main.js', { minify: false, sourceMaps: false })
      .then(function (input) {

          var fileContents = input.source.split("\n");
          var rows = fileContents.length;

          var output = "";

          for (var i = 0; i < rows; i++) {
              var currentLine = fileContents[i];
              if (currentLine.indexOf('application/') > -1) {
                  if (currentLine.indexOf('.html') > -1) {
                      currentLine = currentLine.replace(".html", ".html" + version);
                      currentLine = currentLine.replace("+ exports.debugVersion", "");
                      //console.log(currentLine);

                      var test = currentLine.match(/templateUrl.*\?/);

                      if (test != null) {

                          var fileName = "";

                          var start = currentLine.indexOf(':') + 3;
                          var end = currentLine.indexOf('?')
                          var len = end - start;
                          var fileName = currentLine.substr(start, len);

                          //console.log("filename=" + fileName + "*");

                          var htmlContent = fs.readFileSync("./" + fileName, "ASCII");
                          returnString = "\'" + htmlContent.replace("o;?", "") + "\'";
                          returnString = returnString.replace("\r", "");
                          returnString = returnString.replace("\n", "");

                          //console.log("start=" + fileName);
                          //console.log(returnString);
                          //console.log("================")

                          currentLine = currentLine.replace("templateUrl: ", "template:");
                          currentLine = currentLine.replace(fileName, "");
                          currentLine = currentLine.replace("'" + version + "'", returnString);
                          console.log(currentLine);
                          //currentLine = currentLine.replace(fileName, "");
                          // currentLine = currentLine.replace("'?" + version + "'", returnString  )
                          // console.log(currentLine);

                      }

                  }
                  else if (currentLine.indexOf('.css') > -1) {
                      currentLine = currentLine.replace(".css", ".css" + version)
                  }

              }

              output = output + currentLine + "\r\n";
          }

          return output;

      }).then(function (modifiedString) {

          streams = [];
          var stream = source("minify.js");
          var streamEnd = stream;
          stream.write(modifiedString);
          process.nextTick(function () {
              stream.end();
          });

          streamEnd = streamEnd.pipe(vinylBuffer()).pipe(uglify()).pipe(concat('angular2.min.js')).pipe(gulp.dest(appProd));

          streams.push(streamEnd);

          console.log("done with task.");

      }).catch(function (err) {
          console.log('Bundle error');
          console.log(err);
      });


    //gulp.task('bundle:js', function () {
    //    return gulp
    //        .src([
    //            "file1.js",
    //            "file2.js"
    //        ])
    //        .pipe(replace(/templateUrl.*\'/g, function (matched) {
    //            var fileName = matched.match(/\/.*html/g).toString();
    //            var fileContent = fs.readFileSync(fileName, "utf8");
    //            return 'template:\'' + fileContent.replace(/\r\n/g, '') + '\'';
    //        }))
    //        .pipe(concat('file.min.js'))
    //        .pipe(gulp.dest('my bundle folder'))
    //        .pipe(uglify())
    //        .pipe(gulp.dest('my bundle folder'));
    //});




    //return builder.buildStatic("./app/main.js", appProd + '/angular2.js', { minify: false, sourceMaps: true })
    //.then(function (output) {
    //    gulp.src(appProd + '/angular2.js')
    //      .pipe(inlineNg2Template({ base: "./", css: false }))
    //      .pipe(gulp.dest('./distribution/app/angular2.min.js'));      
    //    console.log('Build complete');
    //})
    //.catch(function(err) {
    //    console.log(err);      
    //});


});

//gulp.task('compile:inline-templates', function () {
//    return gulp.src('./distribution/app/angular2.js')
//        .pipe(inlineNg2Template({ UseRelativePaths: true, target: 'es5', indent: 0, css: false }))
//		.pipe(gulp.dest('./distribution/app/angular2.min.js'));
//});


gulp.task("appendVersionNumberToHTMLandCSSfiles", function () {

    var output = "";

    lr = new LineByLineReader(appProd + '/angular2.temp.js');

    lr.on('error', function (err) {

    });

    lr.on('line', function (line) {

        var currentLine = line;

        if (line.indexOf('application/') > -1) {

            if (line.indexOf('.html') > -1) {
                currentLine = currentLine.replace(".html", ".html" + version)
            }
            else if (line.indexOf('.css') > -1) {
                currentLine = currentLine.replace(".css", ".css" + version)
            }

        }

        output = output + currentLine + "\r\n";


    });


    lr.on('end', function () {
        // All lines are read, file is closed now.       
        gulpFile('angular2.temp2.js', output, { src: false }).pipe(gulp.dest(appProd));
        //return gulp.src(appProd + '/angular2.temp2.js').pipe(uglify()).pipe(concat('angular2.min.js')).pipe(gulp.dest(appProd));
    });

});

gulp.task("minifyJavascriptFiles", function () {
    return gulp.src(appProd + '/angular2.temp2.js').pipe(uglify())
      .pipe(concat('angular2.min.js')).pipe(gulp.dest(appProd));
});


gulp.task("buildForProduction", ['injectHTML'], function () {

    console.log('build For Production started.');

    var builder = new Builder('./', 'systemjs.config.js');
    builder.buildStatic('./application/main.js', 'scripts/angular2.min.js', { minify: true, sourceMaps: false });

    console.log('build For Production completed.');

});


//
// the following series of tasks builds each component of angular 2 into a temp directory - for caching in development mode
//
gulp.task('@angular-core.js', function () {

    var SystemBuilder = require('systemjs-builder');
    var builder = new SystemBuilder();

    builder.loadConfig('./systemjs.config.js')
   .then(function () {
       return builder.bundle('@angular/core', appDevTemp + '/core.js');
   })
   .then(function () {
       console.log('core.js created...');
       return;
   });


});

gulp.task('@angular-compiler', function () {

    var SystemBuilder = require('systemjs-builder');
    var builder = new SystemBuilder();

    builder.loadConfig('./systemjs.config.js')
   .then(function () {
       return builder.bundle('@angular/compiler', appDevTemp + '/compiler.js');
   })
   .then(function () {
       console.log('compiler.js created...');
       return;
   });


});

gulp.task('@angular-forms', function () {

    var SystemBuilder = require('systemjs-builder');
    var builder = new SystemBuilder();

    builder.loadConfig('./systemjs.config.js')
   .then(function () {
       return builder.bundle('@angular/forms', appDevTemp + '/forms.js');
   })
   .then(function () {
       console.log('forms.js created...');
       return;
   });

});

gulp.task('@angular-common', function () {

    var SystemBuilder = require('systemjs-builder');
    var builder = new SystemBuilder();

    builder.loadConfig('./systemjs.config.js')
   .then(function () {
       return builder.bundle('@angular/common', appDevTemp + '/common.js');
   })
   .then(function () {
       console.log('common.js created...');
       return;
   });


});

gulp.task('@angular-http', function () {

    var SystemBuilder = require('systemjs-builder');
    var builder = new SystemBuilder();

    builder.loadConfig('./systemjs.config.js')
   .then(function () {
       return builder.bundle('@angular/http', appDevTemp + '/http.js');
   })
   .then(function () {
       console.log('http.js created...');
       return;
   });

});

gulp.task('@angular-router', function () {

    var SystemBuilder = require('systemjs-builder');
    var builder = new SystemBuilder();

    builder.loadConfig('./systemjs.config.js')
   .then(function () {
       return builder.bundle('@angular/router', appDevTemp + '/router.js');
   })
   .then(function () {
       console.log('router.js created...');
       return;
   });

});

gulp.task('@angular-platform-browser', function () {

    var SystemBuilder = require('systemjs-builder');
    var builder = new SystemBuilder();

    builder.loadConfig('./systemjs.config.js')
   .then(function () {
       return builder.bundle('@angular/platform-browser', appDevTemp + '/platform-browser.js');
   })
   .then(function () {
       console.log('platform-browser.js created...');
       return;
   });

});

gulp.task('@angular-platform-browser-dynamic', function () {

    var SystemBuilder = require('systemjs-builder');
    var builder = new SystemBuilder();

    builder.loadConfig('./systemjs.config.js')
   .then(function () {
       return builder.bundle('@angular/platform-browser-dynamic', appDevTemp + '/platform-browser-dynamic.js');
   })
   .then(function () {
       console.log('platform-browser-dynamic.js created...');
       return;
   });

});

gulp.task('rxjs', function () {

    var SystemBuilder = require('systemjs-builder');
    var builder = new SystemBuilder();

    builder.loadConfig('./systemjs.config.js')
   .then(function () {
       return builder.bundle('rxjs/Rx', appDevTemp + '/rxjs.js');
   })
   .then(function () {
       console.log('rxjs created...');
       return;
   });

});

//
//  build the components for ng2 bootstrap
////
//gulp.task('ng2-bootstrap', function () {

//    var SystemBuilder = require('systemjs-builder');
//    var builder = new SystemBuilder();

//    builder.loadConfig('./systemjs.bundle.js')
//     .then(function () {
//         builder.bundle('ng2-bootstrap/ng2-bootstrap', appDevTemp + '/ng2-bootstrap.js');
//     })
//     .then(function () {
//         console.log('ng2-bootstrap.js created');
//         return;
//     });

//});

//
//  minify the development build for angular 2
//
gulp.task('buildForDevelopment', [
    "@angular-core.js",
    '@angular-compiler',
    '@angular-common',
    '@angular-forms',
    '@angular-http',
    '@angular-router',
    '@angular-platform-browser',
    '@angular-platform-browser-dynamic',
    'rxjs'],
    function () {
        return gulp.src(appDevTemp + '/*.js').pipe(uglify()).pipe(concat('angular2-dev.min.js')).pipe(gulp.dest(appProd));
    }

);

//
//  task builds all the components for the angular 2 framework so that the framework can be cached during development
////
//gulp.task('buildForDevelopment', function () {

//    console.log('build-angular2-for-dev started.');

//    runSequence(
//     "@angular-core.js",
//     '@angular-compiler',
//     '@angular-common',
//     '@angular-forms',
//     '@angular-http',
//     '@angular-router',
//     '@angular-platform-browser',
//     '@angular-platform-browser-dynamic',
//     'rxjs',
//     "buildForDevelopment-minify-angular2"

// );

//    console.log('build-angular2-for-dev completed.');
//});

//
//  task to launch browsersync for development 
//

gulp.task('sync', function () {

    browserSync.init({
        port: iisPort + 1
    });

    gulp.watch("application/**/*.html").on('change', browserSync.reload);
    gulp.watch("application/**/*.js").on('change', browserSync.reload);
    gulp.watch("*.cshtml").on('change', browserSync.reload);

});


gulp.task('default', function () {

});









