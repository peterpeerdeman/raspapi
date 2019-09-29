var express = require('express');
var router = express.Router();

var Transmission = require('transmission');
var _ = require('lodash');
var fs = require('fs');
var validUrl = require('valid-url');
var powercheck = require('powercheck');
var GoogleSpreadsheet = require('google-spreadsheet');
var pirateparser = require('./pirateparser');

if (process.env.DOWNLOAD_KEYWORDSHEET) {
    var keywordDoc = new GoogleSpreadsheet(process.env.DOWNLOAD_KEYWORDSHEET);
}

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

router.get('/keywords', function(req, res) {
    if (!keywordDoc) {
        throw new Error('keyworddoc was not defined');
    }

    keywordDoc.getInfo(function(err, info) {
        if (err) throw err;
        var sheet = info.worksheets[0];
        sheet.getRows({
            limit: 100
        }, function(err, rows) {
            if (err) throw err;
            var result = rows.map(function(row) {
                return _.pick(row, ['id','name']);
            });

            res.send(result);
        });
    });
});

router.post('/search', function(req, res) {
    powercheck.Throw(req.body.query, String);
    pirateparser.search(req.body.query, function(list) {
        res.send(list);
    });
});

router.post('/getmagnet', function(req, res) {
    powercheck.Throw(req.body.url, String);
    pirateparser.getmagnet(req.body.url, function(magnet) {
        res.send(magnet);
    });
});

router.post('/add-url', function(req, res) {
    if (!validUrl.isUri(req.body.url)) {
        res.sendStatus(400);
        return;
    }

    transmission.addUrl(req.body.url, function(err, data) {
        if (err) {
            throw err;
        }
        res.send(data);
    });
});

module.exports = router;
