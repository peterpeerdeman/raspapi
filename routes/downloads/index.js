var express = require('express');
var router = express.Router();

var Transmission = require('transmission');
var _ = require('lodash');

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

module.exports = router;
