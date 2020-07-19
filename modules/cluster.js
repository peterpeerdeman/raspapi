const Unifi = require('node-unifi-poecontrol');
const unifi = new Unifi(process.env.CLUSTER_UNIFI_HOST);

module.exports.getDevices = function() {
    return unifi.login(process.env.CLUSTER_UNIFI_USERNAME, process.env.CLUSTER_UNIFI_PASSWORD).then(loginresponse => {
        return unifi.getDevices();
    });
};

module.exports.getDevice = function(device_id) {
    return unifi.login(process.env.CLUSTER_UNIFI_USERNAME, process.env.CLUSTER_UNIFI_PASSWORD).then(loginresponse => {
        return unifi.getDevices().then(response => {
            const device = response.data.find(element => {
                return element.device_id === device_id;
            });
            return device;
        });
    });
};

module.exports.getPortTable = function(device_id) {
    return module.exports.getDevice(device_id).then(device => {
        return device.port_table;
    });
};

module.exports.setPoePorts = function(device_id, portConfig) {
    return unifi.login(process.env.CLUSTER_UNIFI_USERNAME, process.env.CLUSTER_UNIFI_PASSWORD).then(loginresponse => {
        // set first and second poe port to be enabled, third one to be disabled
        return unifi.setPoePorts(device_id, portConfig).then(response => {
            return response;
        });
    });
};
