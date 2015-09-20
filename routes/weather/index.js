var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/temperatures', function (req, res) {
    var url = 'http://127.0.0.1:1234/temperatures';
    if (req.query.limit) {
        url += '?limit='+req.query.limit;
    }
    request.get(url).pipe(res);
})

module.exports = router;
