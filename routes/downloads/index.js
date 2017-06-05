var express = require('express');
var router = express.Router();

var Transmission = require('transmission');
var _ = require('lodash');
var fs = require('fs');

var transmission = new Transmission({
    host: process.env.TRANSMISSION_HOST,
    port: process.env.TRANSMISSION_PORT
});

function transformTorrents(torrents) {
    return torrents.map(function(torrent) {
        return _.pick(torrent, ['id', 'name', 'status', 'rateDownload', 'rateUpload']);
    });
};

router.get('/all', function(req, res) {

    transmission.get(function(err, data){
        if (err) {
            throw err;
        }
        var result = transformTorrents(data.torrents);
        res.send(result);
    });
});

router.get('/active', function(req, res) {
    transmission.active(function(err, data){
        if (err) {
            throw err;
        }
        var result = transformTorrents(data.torrents);
        res.send(result);
    });
});

router.get('/sessionstats', function(req, res) {
    transmission.sessionStats(function(err, data) {
        if (err) {
            throw err;
        }
        res.send(data);
    });
});

router.get('/folder', function(req, res) {
    fs.stat(process.env.DOWNLOAD_FOLDER, function(err, stats) {
        if (stats) {
            fs.readdir(process.env.DOWNLOAD_FOLDER, function(err, dirs) {
                if (err) {
                    throw err;
                }
                res.send(dirs);
            });
        } else {
            res.sendStatus(404);
        }
    });
});

module.exports = router;
