require('dotenv').config();

var express = require('express');
var app = express();
var fs = require( 'fs' );
var auth = require('basic-auth');

//authorization
app.use(function(req, res, next) {
    var credentials = auth(req);
    if (!credentials || credentials.name !== process.env.API_USER || credentials.pass !== process.env.API_PASS) {
        res.set({
            'WWW-Authenticate': 'Basic realm="simple-admin"'
        });
        res.sendStatus(401);
    } else {
        next();
    }
});

routes = fs.readdirSync('./routes');
routes.forEach( function( routeFile ) {
    app.use('/api/' + routeFile, require('./routes/' + routeFile));
});

function error(err, req, res, next) {
    console.error(err.stack);
    res.send(500);
}
app.use(error);

var server = app.listen(process.env.RASPAPI_PORT, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('raspapi listening at http://%s:%s', host, port);

});
