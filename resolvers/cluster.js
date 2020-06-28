const cluster = require('../modules/cluster');

module.exports.portTable = (parent, args, context, info) => {
    return cluster.getDevices().then(devices => {
        if(devices.data.length == 0) {
            throw new Error('no devices detected to get porttables from');
        };
        if(devices.data.length > 1) {
            throw new Error('more than 1 device detected, dont know which one to address');
        };
        return cluster.getPortTable(devices.data[0].device_id);
    });
};

module.exports.cluster_scale = (parent, args, context, info) => {
    return cluster.getDevices().then(devices => {
        if(devices.data.length == 0) {
            throw new Error('no devices detected to get porttables from');
        };
        if(devices.data.length > 1) {
            throw new Error('more than 1 device detected, dont know which one to address');
        };

        const device_id = devices.data[0].device_id;

        let promise;
        switch(args.instances) {
            case 0:
                promise = cluster.setPoePorts(device_id, [false, false, false, true]);
            break;
            case 1:
                promise = cluster.setPoePorts(device_id, [true, false, false, true]);
            break;
            case 2:
                promise = cluster.setPoePorts(device_id, [true, true, false, true]);
            break;
            case 3:
                promise = cluster.setPoePorts(device_id, [true, true, true, true]);
            break;
            default:
                throw new Error('this number of instances is not supported');
            break;
        }

        return promise.then(response => {
            return [];
        });
    });
};
