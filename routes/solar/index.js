var express = require('express');
var router = express.Router();

var PVoutputAPI = require('pvoutput-nodejs');

var pvoutput = new PVoutputAPI({
    debug: false,
    apiKey: process.env.PVOUTPUT_APIKEY,
    systemId: process.env.PVOUTPUT_SYSTEMID
});

router.get('/status', function(req, res) {
    return pvoutput.getStatus().then(function(results) {
        res.send(results);
    })
    .catch(function(err) {
        throw err;
    });
});

router.get('/output', function(req, res) {
    return pvoutput.getOutput().then(function(results) {
        res.send(results);
    })
    .catch(function(err) {
        throw err;
    });
});

module.exports = router;
