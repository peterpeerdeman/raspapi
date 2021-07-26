var express = require('express');
var router = express.Router();

// var mpd = require('mpd');
// var cmd = mpd.cmd;

const music = require('../../modules/music');

// function connect() {
//     return mpd.connect({
//         host: process.env.MPD_HOST,
//         port: process.env.MPD_PORT,
//     });
// }

router.get('/currentsong', async function (req, res) {
    const result = await music.getCurrentSong();
    res.send(result);
});

router.post('/play', async function (req, res) {
    const result = await music.play();
    res.send(result);
});

router.post('/pause', async function (req, res) {
    const result = await music.pause();
    res.send(result);
});

router.post('/stop', async function (req, res) {
    const result = await music.stop();
    res.send(result);
});

/*
router.get('/playlists', function (req, res) {
    var client = connect();
    client.on('ready', function () {
        client.sendCommand(cmd('listplaylists', []), function (err, msg) {
            if (err) throw err;
            var result = [];
            var lines = msg.split('\n');

            lines.forEach(function (statusline) {
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

router.post('/playlists/:playlistname/load', function (req, res) {
    var client = connect();
    client.on('ready', function () {
        client.sendCommand(
            cmd('load', [req.params.playlistname]),
            function (err, msg) {
                if (err) throw err;
                res.sendStatusJson(200);
            }
        );
    });
});

router.get('/status', function (req, res) {
    var client = connect();
    client.on('ready', function () {
        client.sendCommand(cmd('status', []), function (err, msg) {
            if (err) throw err;
            var result = {};
            var lines = msg.split('\n');
            lines.forEach(function (statusline) {
                var statuslineArray = statusline.split(': ');
                var key = statuslineArray[0];
                var value = statuslineArray[1];
                result[key] = value;
            });

            res.send(result);
        });
    });
});

router.post('/stop', function (req, res) {
    var client = connect();
    client.on('ready', function () {
        client.sendCommand(cmd('stop', []), function (err, msg) {
            if (err) throw err;
            res.sendStatusJson(200);
        });
    });
});

router.post('/next', function (req, res) {
    var client = connect();
    client.on('ready', function () {
        client.sendCommand(cmd('next', []), function (err, msg) {
            if (err) throw err;
            res.sendStatusJson(200);
        });
    });
});

router.post('/clear', function (req, res) {
    var client = connect();
    client.on('ready', function () {
        client.sendCommand(cmd('clear', []), function (err, msg) {
            if (err) throw err;
            res.sendStatusJson(200);
        });
    });
});
*/

module.exports = router;
