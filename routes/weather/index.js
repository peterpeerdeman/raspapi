var express = require('express');
var request = require('request');
var router = express.Router();

router.all('/*', function (req, res) {
    var url = 'http://127.0.0.1:1234' + req.url;
    req.pipe(request(url)).pipe(res);
})

module.exports = router;
