(function (global) {


    // map tells the System loader where to look for things
    var map = {
        'application': 'application', // 'dist',       
        'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',      
        'moment': 'node_modules/moment/moment.js'

    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'application': { main: 'main.js', defaultExtension: 'js' }       
    };
 

    var config = {
        map: map,
        packages: packages
    }

    // filterSystemConfig - index.html's chance to modify config before we register it.
    if (global.filterSystemConfig) { global.filterSystemConfig(config); }

    System.config(config);

})(this);