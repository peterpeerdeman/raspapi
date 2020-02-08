const express = require('express');
const router = express.Router();

const Influx = require('influxdb-nodejs');
const influxClient = new Influx('http://127.0.0.1:8086/tesla');

router.get('/charge', function(req, res) {
    let query = influxClient
    .query('charge_state')
    .addFunction('last(battery_level)', {
        alias: "battery_level"
    })
    // .addFunction('last(ideal_battery_range)*1.60934', {
    //     alias: "battery_range"
    // });
    query.then((result) => {
        res.send(result);
    })
    .catch(console.error);
});

module.exports = router;
