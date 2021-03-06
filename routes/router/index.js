const express = require('express');
const router = express.Router();

const Influx = require('influxdb-nodejs');
const influxClient = new Influx(process.env.INFLUXDB_HOST + 'router');

router.get('/bandwidth', function(req, res) {
    let query = influxClient
    .query('bandwidth')
    .addFunction('last', 'downCurrent')
    .addFunction('last', 'upCurrent')
    .addGroup('time(10m)');
    query.start = '-1h';
    query.end = 'now()';
    query.then((result) => {
        res.send(result);
    })
    .catch(console.error);
});

router.get('/devices', function(req, res) {
    const macs = process.env.ROUTER_MACS.split(',');
    Promise.all(macs.map(function(mac) {
        let query = influxClient
        .query('devices');
        query.addFunction('last', 'active', {
            alias: mac
        })
        .where('mac', mac, '=')
        .addGroup('time(10m)');
        query.start = '-1h';
        query.end = 'now()';
        return query;
    }))
    .then((result) => {
        res.send(result);
    })
    .catch(console.error);
});

module.exports = router;
