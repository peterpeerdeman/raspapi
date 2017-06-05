var express = require('express');
var router = express.Router();

var _ = require('lodash');
var request = require('request');

router.get('/select', function(req, res) {
    request('http://' + process.env.XBMC_HOST + ':' + process.env.XBMC_PORT + '/jsonrpc?request={"jsonrpc": "2.0", "id": 1, "method": "Input.Select"}', function(err, data) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.sendStatus(200);
    });
});

router.get('/right', function(req, res) {
    request('http://' + process.env.XBMC_HOST + ':' + process.env.XBMC_PORT + '/jsonrpc?request={"jsonrpc": "2.0", "id": 1, "method": "Input.Right"}', function(err, data) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.sendStatus(200);
    });
});

router.get('/left', function(req, res) {
    request('http://' + process.env.XBMC_HOST + ':' + process.env.XBMC_PORT + '/jsonrpc?request={"jsonrpc": "2.0", "id": 1, "method": "Input.Left"}', function(err, data) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.sendStatus(200);
    });
});

router.get('/down', function(req, res) {
    request('http://' + process.env.XBMC_HOST + ':' + process.env.XBMC_PORT + '/jsonrpc?request={"jsonrpc": "2.0", "id": 1, "method": "Input.Down"}', function(err, data) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.sendStatus(200);
    });
});

router.get('/up', function(req, res) {
    request('http://' + process.env.XBMC_HOST + ':' + process.env.XBMC_PORT + '/jsonrpc?request={"jsonrpc": "2.0", "id": 1, "method": "Input.Up"}', function(err, data) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.sendStatus(200);
    });
});

router.get('/quit', function(req, res) {
    request('http://' + process.env.XBMC_HOST + ':' + process.env.XBMC_PORT + '/jsonrpc?request={"jsonrpc": "2.0", "id": 1, "method": "Application.Quit"}', function(err, data) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.sendStatus(200);
    });
});

router.get('/pause', function(req, res) {
    request('http://' + process.env.XBMC_HOST + ':' + process.env.XBMC_PORT + '/jsonrpc?request={"jsonrpc": "2.0", "id": 1, "method": "Player.PlayPause", "params": { "playerid": 1 }}', function(err, data) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.sendStatus(200);
    });
});

module.exports = router;
