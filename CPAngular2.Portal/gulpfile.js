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
var bootlint = require('gulp-bootlint');


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
//
//  inject HTML templates into components
//
gulp.task("buildForProduction", function () {

    console.log('injectHTML started');

    var i = 0;

    return gulp.src('application/**/*.js').pipe(foreach(function (stream, file) {

        var name = file.path;
        var fileStream = fs.readFileSync(name, "utf8");

        var fileContents = fileStream.split("\n");
        var rows = fileContents.length;

        var output = "";

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
                        console.log(htmlFileName + " not found.")
                    }

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

    })).on('end', function () {

        console.log('stream ended');

        console.log('build For Production started.');

        var builder = new Builder('./', 'systemjs.config.js');
        builder.buildStatic('./application/main.js', 'scripts/angular2.min.js', { minify: true, sourceMaps: false }
        ).then(function () {
            console.log('Build static complete');
        });

        console.log('build static executing.');

    });



});
//
//  build for production
////
//gulp.task("buildForProduction", ['injectHTML'], function () {

//    console.log('build For Production started.');

//    var builder = new Builder('./', 'systemjs.config.js');
//    builder.buildStatic('./application/main.js', 'scripts/angular2.min.js', { minify: true, sourceMaps: false });

//    console.log('build For Production completed.');

//});

//
// the following series of tasks builds each component of angular 2 into a temp directory - for caching in development mode
//
gulp.task('@angular.js', function () {

    var SystemBuilder = require('systemjs-builder');
    var builder = new SystemBuilder('./', 'systemjs.config.js');
    builder.bundle('@angular/core', appDevTemp + '/core.js');
    builder.bundle('@angular/compiler', appDevTemp + '/compiler.js');
    builder.bundle('@angular/forms', appDevTemp + '/forms.js');
    builder.bundle('@angular/common', appDevTemp + '/common.js');
    builder.bundle('@angular/http', appDevTemp + '/http.js');
    builder.bundle('@angular/router', appDevTemp + '/router.js');
    builder.bundle('@angular/platform-browser', appDevTemp + '/platform-browser.js');
    builder.bundle('@angular/platform-browser-dynamic', appDevTemp + '/platform-browser-dynamic.js');
    builder.bundle('rxjs/Rx', appDevTemp + '/rxjs.js');
    return;

});
//
//  minify the development build for angular 2
//
gulp.task('buildForDevelopment', ["@angular.js"],
    function () {
        return gulp.src(appDevTemp + '/*.js').pipe(uglify()).pipe(concat('angular2-dev.min.js')).pipe(gulp.dest(appProd));
    }

);
//
//  configure browser sync
//
gulp.task('sync', function () {

    browserSync.init({
        port: iisPort + 1
    });

    gulp.watch("application/**/*.html").on('change', browserSync.reload);
    gulp.watch("application/**/*.js").on('change', browserSync.reload);
    gulp.watch("*.cshtml").on('change', browserSync.reload);

});

gulp.task('bootlint', function () {
    return gulp.src('./3.htm')
        .pipe(bootlint({
            stoponerror: false,
            stoponwarning: false,
            loglevel: 'debug',
            reportFn: function (file, lint, isError, isWarning, errorLocation) {
                var message = (isError) ? "ERROR! - " : "WARN! - ";
                if (errorLocation) {
                    message += file.path + ' (line:' + (errorLocation.line + 1) + ', col:' + (errorLocation.column + 1) + ') [' + lint.id + '] ' + lint.message;
                } else {
                    message += file.path + ': ' + lint.id + ' ' + lint.message;
                }
                console.log(message);
            },
            summaryReportFn: function (file, errorCount, warningCount) {
                if (errorCount > 0 || warningCount > 0) {
                    console.log("please fix the " + errorCount + " errors and " + warningCount + " warnings in " + file.path);
                } else {
                    console.log("No problems found in " + file.path);
                }
            }
        }));
});

//
//  default task
//
gulp.task('default', function () {

});









