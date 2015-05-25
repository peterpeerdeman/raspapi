var express = require('express');
var app = express();

var top = require('./routes/top');
var mpd = require('./routes/mpd');

app.use('/api/top', top);
app.use('/api/mpd', mpd);

app.use(error);

// error handling middleware have an arity of 4
// instead of the typical (req, res, next),
// otherwise they behave exactly like regular
// middleware, you may have several of them,
// in different orders etc.
function error(err, req, res, next) {
  // log it
  console.error(err.stack);

  // respond with 500 "Internal Server Error".
  res.send(500);
}

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('raspapi listening at http://%s:%s', host, port);

});
