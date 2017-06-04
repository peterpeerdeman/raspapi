var express = require('express');
var request = require('request');
var router = express.Router();

router.all('/*', function(req, res) {
    var url = process.env.WEATHER_HOST + req.url;
    req.pipe(request(url))
    .on('error', function(e){
        console.log(e);
        res.end();
    })
    .pipe(res);
});

module.exports = router;
