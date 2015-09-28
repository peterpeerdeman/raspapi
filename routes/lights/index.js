var express = require('express');
var router = express.Router();
var hue = require('node-hue-api');
var HueApi = hue.HueApi;

var hostname = '192.168.117.28';
var username = '';
var api = new HueApi(hostname, username);

router.get('/bridges', function(req, res) {
    hue.nupnpSearch(function(err, result) {
        if (err) throw err;
        res.send(result);
    });
});

router.get('/lights', function(req, res) {
    api.lights(function(err, lights) {
        if (err) throw err;
        res.send(lights);
    });
});

router.get('/lights/:id', function(req, res) {
    api.lightStatus(req.params.id)
        .then(function(result) {
            res.send(result);
        })
        .done();
});

router.get('/groups', function(req, res) {
    api.groups()
        .then(function(result) {
            res.send(result);
        })
        .done();
});
/*
router.get('/register', function(req, res) {
    api = new HueApi();
    api.createUser(hostname, null, null, function(err, user) {
        if (err) throw err;
        res.send(user);
    });
});
*/

router.get('/on', function(req, res) {
    api.setGroupLightState(0, {'on': true}) // provide a value of false to turn off
        .then(function(result) {
            res.send(result);
        })
        .fail(function(error) {
            res.send(result);
        })
        .done();
});

router.get('/off', function(req, res) {
    api.setGroupLightState(0, {'on': false}) // provide a value of false to turn off
        .then(function(result) {
            res.send(result);
        })
        .fail(displayError)
        .done();
});

module.exports = router;
