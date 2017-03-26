var express = require('express');
var router = express.Router();

var mpd = require('mpd');
var cmd = mpd.cmd;

function connect() {
    return mpd.connect({
        port: 6600,
        host: 'localhost'
    });
}

router.get('/currentsong', function(req, res) {
    var client = connect();
    client.on('ready', function() {
        client.sendCommand(cmd('currentsong', []), function(err, msg) {
            if (err) throw err;

            var result = {};
            var lines = msg.split('\n');

            lines.forEach(function(statusline) {
                var statuslineArray = statusline.split(': ');
                var key = statuslineArray[0];
                var value = statuslineArray[1];
                result[key] = value;
            });

            res.send(result);
        });
    });
});

router.get('/playlists', function(req, res) {
    var client = connect();
    client.on('ready', function() {
        client.sendCommand(cmd('listplaylists', []), function(err, msg) {
            if (err) throw err;
            var result = [];
            var lines = msg.split('\n');

            lines.forEach(function(statusline) {
                var statuslineArray = statusline.split(': ');
                var key = statuslineArray[0];
                var value = statuslineArray[1];
                if (key == 'playlist') {
                    result.push(value);
                }
            });

            res.send(result);
        });
    });
});


router.post('/playlists/:playlistname/load', function(req, res) {
    var client = connect();
    client.on('ready', function() {
        client.sendCommand(cmd('load', [req.params.playlistname]), function(err, msg) {
            if (err) throw err;
            res.sendStatus(200);
        });
    });
});

router.get('/status', function(req, res) {
    var client = connect();
    client.on('ready', function() {
        client.sendCommand(cmd('status', []), function(err, msg) {
            if (err) throw err;
            var result = {};
            var lines = msg.split('\n');
            lines.forEach(function(statusline) {
                var statuslineArray = statusline.split(': ');
                var key = statuslineArray[0];
                var value = statuslineArray[1];
                result[key] = value;
            });

            res.send(result);
        });
    });
});

router.post('/stop', function(req, res) {
    var client = connect();
    client.on('ready', function() {
        client.sendCommand(cmd('stop', []), function(err, msg) {
            if (err) throw err;
            res.sendStatus(200);
        });
    });
});

router.post('/next', function(req, res) {
    var client = connect();
    client.on('ready', function() {
        client.sendCommand(cmd('next', []), function(err, msg) {
            if (err) throw err;
            res.sendStatus(200);
        });
    });
});

router.post('/pause', function(req, res) {
    var client = connect();
    client.on('ready', function() {
        client.sendCommand(cmd('pause', []), function(err, msg) {
            if (err) throw err;
            res.sendStatus(200);
        });
    });
});

router.post('/clear', function(req, res) {
    var client = connect();
    client.on('ready', function() {
        client.sendCommand(cmd('clear', []), function(err, msg) {
            if (err) throw err;
            res.sendStatus(200);
        });
    });
});

router.post('/play', function(req, res) {
    var client = connect();
    client.on('ready', function() {
        client.sendCommand(cmd('play', []), function(err, msg) {
            if (err) throw err;
            res.sendStatus(200);
        });
    });
});

module.exports = router;
