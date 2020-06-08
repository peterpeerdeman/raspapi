const car = require('../modules/car');

module.exports.charge = (parent, args, context, info) => {
    return car.getCharge().then((result) => {
        const values = result.results[0].series[0].values[0];
        return {
            timestamp: values[0],
            batteryLevel: values[1],
        };
    });
};
