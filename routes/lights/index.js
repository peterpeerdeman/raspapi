var express = require('express');
var router = express.Router();
var hue = require('node-hue-api');
var q = require('q');
var HueApi = hue.HueApi;
var lightState = hue.lightState;

var hostname = '192.168.117.28';
var username = '120e0f4639d30f441d7b6b923e8a073f';
var api = new HueApi(hostname, username);

router.get('/bridges', function(req, res) {
    hue.nupnpSearch(function(err, result) {
        if (err) throw err;
        res.send(result);
    });
});

router.get('/lights', function(req, res) {
    api.lights(function(err, lights) {
        if (err) throw err;
        res.send(lights);
    });
});

router.get('/lights/details', function(req, res) {
    api.lights(function(err, result) {
        if (err) throw err;
        var promises = [];
        result.lights.forEach(function(light) {
            promises.push(api.lightStatus(light.id));
        });
        q.all(promises)
        .then(function(result) {
            var data = [];
            res.send(result);
        },
        function() {
            res.sendStatus(500);
        });
    });
});

router.get('/lights/:id', function(req, res) {
    api.lightStatus(req.params.id)
        .then(function(result) {
            res.send(result);
        })
        .done();
});

router.get('/lights/:id/on', function(req, res) {
    api.setLightState(req.params.id, {'on': true})
        .then(function(result) {
            res.send(result);
        })
        .fail(function(error) {
            res.send(error);
        })
        .done();
});

router.get('/lights/:id/off', function(req, res) {
    api.setLightState(req.params.id, {'on': false})
        .then(function(result) {
            res.send(result);
        })
        .fail(function(error) {
            res.send(error);
        })
        .done();
});

router.get('/lights/:id/random', function(req, res) {
    api.setLightState(req.params.id, {
        'xy': [
            Math.random(),
            Math.random()
        ],
    })
        .then(function(result) {
            res.send(result);
        })
        .fail(function(error) {
            res.send(error);
        })
        .done();
});

router.get('/lights/:id/set', function(req, res) {
    api.lightStatus(req.params.id)
        .then(function(result) {
            var state = lightState.create(result);
            state.rgb([
                req.query.r,
                req.query.g,
                req.query.b
            ]);
            return api.setLightState(req.params.id, state);
        })
        .then(function(result) {
            res.send(result);
        })
        .fail(function(error) {
            res.send(error);
        })
        .done();
});

router.get('/groups', function(req, res) {
    api.groups()
        .then(function(result) {
            res.send(result);
        })
        .done();
});
/*
router.get('/register', function(req, res) {
    api = new HueApi();
    api.createUser(hostname, null, null, function(err, user) {
        if (err) throw err;
        res.send(user);
    });
});
*/

router.get('/on', function(req, res) {
    api.setGroupLightState(0, {'on': true}) // provide a value of false to turn off
        .then(function(result) {
            res.send(result);
        })
        .fail(function(error) {
            res.send(error);
        })
        .done();
});

router.get('/brightness/inc', function(req, res) {
    api.lights(function(err, result) {
        if (err) throw err;
        var promises = [];
        result.lights.forEach(function(light) {
            var state = lightState.create(light);
            promises.push(api.setLightState(light.id, state.bri_inc(50)));
        });
        q.all(promises)
        .then(function(result) {
            var data = [];
            res.send(result);
        },
        function() {
            res.sendStatus(500);
        });
    });
});

router.get('/brightness/dec', function(req, res) {
    api.lights(function(err, result) {
        if (err) throw err;
        var promises = [];
        result.lights.forEach(function(light) {
            var state = lightState.create(light);
            promises.push(api.setLightState(light.id, state.bri_inc(-50)));
        });
        q.all(promises)
        .then(function(result) {
            var data = [];
            res.send(result);
        },
        function() {
            res.sendStatus(500);
        });
    });
});

router.get('/off', function(req, res) {
    api.setGroupLightState(0, {'on': false}) // provide a value of false to turn off
        .then(function(result) {
            res.send(result);
        })
        .fail(function(error) {
            res.send(error);
        })
        .done();
});

router.get('/randomcolor', function(req, res) {
    api.setGroupLightState(0, {
        'xy': [
            Math.random(),
            Math.random()
        ]
    })
        .then(function(result) {
            res.send(result);
        })
        .fail(function(error) {
            res.send(error);
        })
        .done();
});

router.get('/randomcolors', function(req, res) {
    api.lights(function(err, result) {
        if (err) throw err;
        var promises = [];
        result.lights.forEach(function(light) {
            promises.push(api.setLightState(light.id, {
                'xy': [
                    Math.random(),
                    Math.random()
                ]
            }));
        });
        q.all(promises)
        .then(function(result) {
            var data = [];
            res.send(result);
        },
        function() {
            res.sendStatus(500);
        });
    });
});

router.get('/colorloop', function(req, res) {
    var state = lightState.create().colorLoop();
    api.setGroupLightState(0, state)
        .then(function(result) {
            res.send(result);
        })
        .fail(function(error) {
            res.send(error);
        })
        .done();
});
module.exports = router;
