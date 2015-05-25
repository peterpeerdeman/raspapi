var express = require('express');
var app = express();
var top = require('./routes/top');

app.use('/api/top', top);

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
