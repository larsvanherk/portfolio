var express = require('express');
var app = express();
var pjson = require('./package.json');

//// SERVER SETTINGS ////
// Logging Prefix
var prefix = "[PORTFOLIO v" + pjson.version + "] ";

// HTTPS Redirector
var forceSSL = function(req, res, next) {
    var proto = req.get('X-Forwarded-Protocol');

    console.log("Found protocol:", proto);

    if (proto === "http") {
        var url;
        if (req.headers.host.indexOf("http://") !== -1) {
            url = req.headers.host.replace("http://", "https://");
        } else {
            url = "https://" + req.headers.host;
        }

        console.log("Redirecting to:", url);
        res.redirect(301, url);
    } else {
      next();
    }
};

// Request logger
var logger = function(req, res, next) {
    console.log(prefix + "Received request to url '" + req.url + "': ", req.headers['user-agent']);
    next();
};

// Disable server signature
app.set('x-powered-by', false);

//// MAIN APP ////
// Initialize main app Router
var router = express.Router();

// Serve from dist folder
router.use(express.static('dist'));

// Route definitions
router.get('/', function (req, res) {
    res.sendFile('dist/index.html', { root : __dirname });
});

//// MISC APPS ////
// Kubernetes health check
var health = express.Router();

health.get('/', function(req, res) {
    res.sendStatus(200);
});

// Bind routers
app.use('/healthz', health);
app.use('/', [forceSSL, logger, router]);

// Start the app!
app.listen(5000, function() {
    console.log(prefix + "Server started!");
});