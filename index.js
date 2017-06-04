require('dotenv').config();

var express = require('express');
var app = express();
var fs = require( 'fs' );

routes = fs.readdirSync('./routes');
routes.forEach( function( routeFile ) {
    app.use('/api/' + routeFile, require('./routes/' + routeFile));
});

app.use(error);

function error(err, req, res, next) {
    console.error(err.stack);
    res.send(500);
}

var server = app.listen(process.env.RASPAPI_PORT, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('raspapi listening at http://%s:%s', host, port);

});
