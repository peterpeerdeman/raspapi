const Unifi = require('node-unifi-poecontrol');
const unifi = new Unifi(process.env.CLUSTER_UNIFI_HOST);

const DEVICE_ID = process.env.CLUSTER_UNIFI_DEVICE_ID;

module.exports.getDevices = function() {
    return unifi.login(process.env.CLUSTER_UNIFI_USERNAME, process.env.CLUSTER_UNIFI_PASSWORD).then(loginresponse => {
        return unifi.getDevices();
    });
};

module.exports.getDevice = function() {
    return unifi.login(process.env.CLUSTER_UNIFI_USERNAME, process.env.CLUSTER_UNIFI_PASSWORD).then(loginresponse => {
        return unifi.getDevices().then(response => {
            const device = response.data.find(element => {
                return element.device_id === DEVICE_ID;
            });
            return device;
        });
    });
};

module.exports.getPortTable = function() {
    return unifi.login(process.env.CLUSTER_UNIFI_USERNAME, process.env.CLUSTER_UNIFI_PASSWORD).then(loginresponse => {
        return unifi.getDevices().then(response => {
            const device = response.data.find(element => {
                return element.device_id === DEVICE_ID;
            });
            return device.port_table;
        });
    });
};

module.exports.getPortTable = function() {
    return unifi.login(process.env.CLUSTER_UNIFI_USERNAME, process.env.CLUSTER_UNIFI_PASSWORD).then(loginresponse => {
        return unifi.getDevices().then(response => {
            const device = response.data.find(element => {
                return element.device_id === DEVICE_ID;
            });
            return device.port_table;
        });
    });
};

module.exports.setPoePorts = function(portConfig) {
    return unifi.login(process.env.CLUSTER_UNIFI_USERNAME, process.env.CLUSTER_UNIFI_PASSWORD).then(loginresponse => {
        // set first and second poe port to be enabled, third one to be disabled
        return unifi.setPoePorts(DEVICE_ID, portConfig).then(response => {
            return response;
        });
    });
};
