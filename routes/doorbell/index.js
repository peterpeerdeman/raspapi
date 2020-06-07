const express = require('express');
const router = express.Router();

const Influx = require('influxdb-nodejs');
const influxClient = new Influx(process.env.INFLUXDB_HOST + 'doorbell');

router.get('/rings', function(req, res) {
    let query = influxClient
    .query('ring');
    query.start = '-7d';
    query.end = 'now()';
    query.then((result) => {
        res.send(result);
    })
    .catch(console.error);
});

router.post('/webhook', function(req, res) {
    /* webhook has following format
{
  "event": "{{{PARTICLE_EVENT_NAME}}}",
  "data": "{{{PARTICLE_EVENT_VALUE}}}",
  "coreid": "{{{PARTICLE_DEVICE_ID}}}",
  "published_at": "{{{PARTICLE_PUBLISHED_AT}}}"
}
    */
    console.log(req.body);
    influxClient.write('ring').field({
        event: req.body.event,
        coreid: req.body.coreid,
        data: req.body.data,
        published_at: req.body.published_at
    }).then(() => {
        console.debug(`${Date.now()} doorbell: influx write point success`);
        res.sendStatus(200);
    })
    .catch((error) => {
        console.debug(`${Date.now()} doorbell: retrieve temperature failed ${error}`);
        res.sendStatus(500);
    });

});

module.exports = router;
