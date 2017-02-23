var express = require('express');
var force = require('forcedomain');
var app = express();
var healthz = express();
var pjson = require('./package.json');

var prefix = "[PORTFOLIO v" + pjson.version + "] ";

// Disable server signature
app.set('x-powered-by', false);

// Force HTTPS & www-based domain
app.use(force({
    hostname: 'www.larsvanherk.com',
    protocol: 'https'
}));

// Log all requests
app.use(function(req, res, next) {
    console.log(prefix + "Received request to url '" + req.url + "': ", req.headers['user-agent']);

    next();
});

// Serve from dist folder
app.use(express.static('dist'));

// Application routes
app.get('/', function (req, res) {
    res.sendFile('dist/index.html', { root : __dirname });
});

// Configure K8S health probe point

healthz.set('x-powered-by', false);
healthz.get('/healthz', function (req, res) {
    res.sendStatus(200);
});

app.listen(5000, function() {
    console.log(prefix + "Server started!");

    healthz.listen(5001, function() {
        console.log(prefix + "Kubernetes health probe point started!");
    });
});