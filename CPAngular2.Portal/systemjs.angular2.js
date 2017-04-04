System.config({
    map: {
        'rxjs': 'node_modules/rxjs',
        '@angular': 'node_modules/@angular',
        'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
        'moment': 'node_modules/moment/moment.js',
        'ng2-bootstrap/ng2-bootstrap': 'node_modules/ng2-bootstrap/ng2-bootstrap.js',
        'application': 'application',
        'ng2-imageupload': 'node_modules/ng2-imageupload'
    },
    packages: {
        '@angular/core': {
            main: 'index'
        },
        '@angular/compiler': {
            main: 'index'
        },
        '@angular/common': {
            main: 'index'
        },
        '@angular/http': {
            main: 'index'
        },
        '@angular/router': {
            main: 'index'
        },
        '@angular/platform-browser': {
            main: 'index'
        },
        '@angular/platform-browser-dynamic': {
            main: 'index'
        },
        'rxjs': {
            main: "Rx"
        },
       'application': {
          main: 'main'
       },
       'ng2-imageupload': {
           main: 'index.js',
           defaultExtension: 'js'
       }
    }
});


