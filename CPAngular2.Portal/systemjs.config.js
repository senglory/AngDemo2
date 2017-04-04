(function (global) {
    SystemJS.config({
        paths: {
            'npm:': 'node_modules/'
        },
        map: {
            application: 'application',
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',

            'rxjs': 'npm:rxjs',

            'ng2-bootstrap': 'npm:ng2-bootstrap/bundles/ng2-bootstrap.umd.min.js',
            'angular2-material-datepicker': 'npm:angular2-material-datepicker'
        },
        packages: {
            application: {
                main: 'main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'angular2-material-datepicker': {
                main: 'index.js',
                defaultExtension: 'js'
            }
        }
    });

    // // map tells the System loader where to look for things
    // var map = {
    //     'application': 'application', // 'dist',
    //     'rxjs': 'node_modules/rxjs',
    //     'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    //     '@angular': 'node_modules/@angular',
    //     'moment': 'node_modules/moment/moment.js',
    //     'ng2-bootstrap/ng2-bootstrap': 'node_modules/ng2-bootstrap/ng2-bootstrap.js',
    //     //'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js',
    //     //'bootstrap': 'node_modules/bootstrap/dist/js/bootstrap.js'
    // };

    // // packages tells the System loader how to load when no filename and/or no extension
    // var packages = {
    //     'application': { main: 'main.js', defaultExtension: 'js' },
    //     'rxjs': { defaultExtension: 'js' },
    //     'angular2-in-memory-web-api': { defaultExtension: 'js' },
    //     'moment': 'node_modules/moment/moment.js',       
    //     'ng2-bootstrap/ng2-bootstrap': { defaultExtension: 'js' }
    // };

    // var packageNames = [
    //   '@angular/common',
    //   '@angular/compiler',
    //   '@angular/core',
    //   '@angular/http',
    //   '@angular/forms',
    //   '@angular/platform-browser',
    //   '@angular/platform-browser-dynamic',
    //   '@angular/router',
    //   '@angular/router-deprecated',
    //   '@angular/testing',
    //   '@angular/upgrade',
    // ];

    // // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
    // packageNames.forEach(function (pkgName) {
    //     packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
    // });

    // var config = {
    //     map: map,
    //     packages: packages,
    //     meta: {
    //         'node_modules/ng2-bootstrap/ng2-bootstrap.js': {
    //             build: true
    //         }
    //     }
    // }

    // // filterSystemConfig - index.html's chance to modify config before we register it.
    // if (global.filterSystemConfig) { global.filterSystemConfig(config); }

    // System.config(config);

})(this);