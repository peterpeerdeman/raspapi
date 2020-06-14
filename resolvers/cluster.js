const cluster = require('../modules/cluster');

module.exports.portTable = (parent, args, context, info) => {
    return cluster.getPortTable();
};

module.exports.cluster_scale = (parent, args, context, info) => {
    let promise;
    switch(args.instances) {
        case 0:
            promise = cluster.setPoePorts([false, false, false]);
        break;
        case 1:
            promise = cluster.setPoePorts([true, false, false]);
        break;
        case 2:
            promise = cluster.setPoePorts([true, true, false]);
        break;
        case 3:
            promise = cluster.setPoePorts([true, true, true]);
        break;
        default:
            throw new Error('this number of instances is not supported');
        break;
    }

    return promise.then(response => {
        return [];
    });
};
