const Influx = require('influxdb-nodejs');
const influxClient = new Influx(process.env.INFLUXDB_HOST + 'tesla');

module.exports.getCharge = function() {
    let query = influxClient
        .query('charge_state')
        .addFunction('last(battery_level)', {
            alias: "battery_level"
        });
    return query;
};
