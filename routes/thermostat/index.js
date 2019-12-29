const express = require('express');
const router = express.Router();

const Tado = require('node-tado-client');
const tado = new Tado();

const formatZone = (zone) => {
    let wanted_temperature;
    const current_temperature = parseFloat(zone['sensorDataPoints']['insideTemperature']['celsius']);
    const humidity            = parseFloat(zone['sensorDataPoints']['humidity']['percentage']);
    const heating_power       = parseFloat(zone['activityDataPoints']['heatingPower']['percentage']);
    const tado_mode           = zone['tadoMode'];
    if (zone['setting']['power'] == 'ON') {
      wanted_temperature = parseFloat(zone['setting']['temperature']['celsius']);
    } else {
      wanted_temperature = current_temperature;
    }
    return {
        'current_temperature' : current_temperature,
        'wanted_temperature'  : wanted_temperature,
        'humidity'            : humidity,
        'heating_power'       : heating_power,
        'tado_mode'           : zone['tadoMode']
    };
};

router.get('/zones', function(req, res) {
    tado.login(process.env.TADO_USERNAME, process.env.TADO_PASSWORD)
    .then(loginresult => {
        return tado.getZones(process.env.TADO_HOME_ID);
    })
    .then(zones => {
        return Promise.all(zones.map(zone => {
            return tado.getZoneState(process.env.TADO_HOME_ID, zone.id)
            .then(zoneresult => {
                const fields = formatZone(zoneresult);
                return {
                    name: zone.name,
                    id: zone.id,
                    ...fields
                };
            });
        }));
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => console.info(err));
});

router.get('/zones/:zone_id/overlay', function(req, res) {
    tado.login(process.env.TADO_USERNAME, process.env.TADO_PASSWORD)
    .then(loginresult => {
        return tado.getZoneOverlay(process.env.TADO_HOME_ID, parseInt(req.params.zone_id));
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.sendStatus(404);
    });
});

router.post('/zones/:zone_id/overlay', function(req, res) {
    const wanted_temperature = parseFloat(req.query.temperature);

    if (wanted_temperature < 15 || wanted_temperature > 25) {
        res.sendStatus(400);
        return;
    }
    tado.login(process.env.TADO_USERNAME, process.env.TADO_PASSWORD)
    .then(loginresult => {
        return tado.setZoneOverlay(process.env.TADO_HOME_ID, parseInt(req.params.zone_id), 'on', wanted_temperature, 'next_time_block');
    })
    .then(result => {
        res.sendStatus(200);
    })
    .catch(err => console.info(err));
});

router.delete('/zones/:zone_id/overlay', function(req, res) {
    tado.login(process.env.TADO_USERNAME, process.env.TADO_PASSWORD)
    .then(loginresult => {
        return tado.clearZoneOverlay(process.env.TADO_HOME_ID, parseInt(req.params.zone_id));
    })
    .then(result => {
        res.sendStatus(200);
    })
    .catch(err => console.info(err));
});

module.exports = router;
