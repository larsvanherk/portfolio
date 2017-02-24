var express = require('express');
var force = require('forcedomain');
var app = express();
var pjson = require('./package.json');

//// SERVER SETTINGS ////
// Loggin Prefix
var prefix = "[PORTFOLIO v" + pjson.version + "] ";

// Disable server signature
app.set('x-powered-by', false);

//// MAIN APP ////
// Initialize main app Router
var router = express.Router();

// General route-univeral logic
router.use(function(req, res, next) {
    console.log(prefix + "Received request to url '" + req.url + "': ", req.headers['user-agent']);
    next();
});

router.use(force({hostname: 'www.larsvanherk.com', protocol: 'https'}));

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
app.use(/^(?!\/healthz).*/, router);

// Start the app!
app.listen(5000, function() {
    console.log(prefix + "Server started!");
});