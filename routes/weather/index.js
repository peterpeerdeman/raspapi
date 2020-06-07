var express = require('express');
var router = express.Router();
const Influx = require('influxdb-nodejs');
const influxClient = new Influx(process.env.INFLUXDB_HOST + 'raspweather-outside');

router.get('/measurements', function(req, res) {
    let query = influxClient
    .query('file')
    .addFunction('mean', 'temperature')
    .addGroup('time(1h)');
    query.start = '-1d';
    query.end = 'now()';
    query.order = 'desc';
    query.then((result) => {
        res.send(result);
    })
    .catch(console.error);
});

router.get('/measurements/last', function(req, res) {
    influxClient
    .query('file')
    .addFunction('last', 'temperature')
    .then((result) => {
        res.send(result);
    })
    .catch(console.error);
});

module.exports = router;
