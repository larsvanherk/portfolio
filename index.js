var express = require('express');
var app = express();
var pjson = require('./package.json');

var prefix = "[PORTFOLIO v" + pjson.version + "] ";

// Disable server signature
app.set('x-powered-by', false);

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

app.listen(5000, function() {
    console.log(prefix + "Server started!");
});