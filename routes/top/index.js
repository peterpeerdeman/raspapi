var fs = require('fs');
var express = require('express');
var router = express.Router();

var parser = require('./parser');
var proc   = require('child_process');

router.get('/', function (req, res) {
    var command = '';
    var limit = Math.min(req.query.limit, 10) || 10;

    switch (require('os').platform()) {
        case 'darwin':
            //2 samples have to be taken, first one doesnt have CPU values
            command = 'top -u -l 2';

            proc.exec(command, function (err, stdout) {

                if (err) {
                    return done(err);
                }

                var bothSamples = stdout.toString();
                var samplesArray = bothSamples.split(/Processes:/);
                var secondSample = "Processes:" + samplesArray[2];

                parser.parse(secondSample, 11, function(err, result) {

                    if (err) {
                        throw err;
                    }

                    var topJson = JSON.parse(result);

                    var sorted = topJson.sort(function(a,b) {
                        return parseFloat(b['%CPU']) - parseFloat(a['%CPU']);
                    });

                    res.send(sorted.slice(0,limit));
                });
            });
            break;

        case 'linux':
            command = 'top -bn 1';
            proc.exec(command, function (err, stdout) {
                if (err) {
                    throw err;
                }

                parser.parse(stdout.toString(), 11, function(err, result) {
                    if (err) {
                        throw err;
                    }

                    var topJson = JSON.parse(result);

                    var sorted = topJson.sort(function(a,b) {
                        return parseFloat(b['%CPU']) - parseFloat(a['%CPU']);
                    });

                    res.send(sorted.slice(0,limit));
                });
            });

            break;

        default:
            throw new Error('does not work on other platforms than darwin and linux');
    }

});

module.exports = router;
