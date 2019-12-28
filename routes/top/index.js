const express = require('express');
const router = express.Router();

const Influx = require('influxdb-nodejs');
const influxClient = new Influx('http://127.0.0.1:8086/raspimetrics');

router.get('/cpu', function(req, res) {
    let query = influxClient
    .query('cpu')
    .addFunction('mean', 'usage_user')
    .where('cpu','cpu-total','=')
    .addGroup('time(10m)');
    query.start = '-1h';
    query.end = 'now()';
    query.then((result) => {
        res.send(result);
    })
    .catch(console.error);
});

router.get('/disk', function(req, res) {
    let query = influxClient
    .query('disk')
    .addFunction('mean', 'used')
    .addGroup('time(10m)');
    query.start = '-1h';
    query.end = 'now()';
    query.then((result) => {
        res.send(result);
    })
    .catch(console.error);
});

router.get('/net', function(req, res) {
    let query = influxClient
    .query('net')
    .addFunction('non_negative_derivative(mean(bytes_recv),1s)*8', {
        alias:'in' 
    })
    .addFunction('non_negative_derivative(mean(bytes_sent),1s)*8', {
        alias:'out' 
    })
    .addGroup('time(10m)');
    query.start = '-1h';
    query.end = 'now()';
    query.then((result) => {
        res.send(result);
    })
    .catch(console.error);
});

module.exports = router;
