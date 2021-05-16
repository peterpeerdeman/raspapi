var express = require('express');
var router = express.Router();
var v3 = require('node-hue-api').v3;
var q = require('q');
// var HueApi = hue.HueApi;
// var lightState = hue.lightState;

const createApi = async () => {
    return v3.api
        .createLocal(process.env.LIGHTS_HOST)
        .connect(process.env.LIGHTS_USERNAME);
};
router.get('/bridges', async function (req, res) {
    const result = await v3.discovery.nupnpSearch();
    res.send(result);
});

router.get('/lights', async function (req, res) {
    const api = await createApi();
    const lights = await api.lights.getAll();
    res.send(lights);
});

/*
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
            res.sendStatusJson(500);
        });
    });
});

router.get('/lights/:id', function(req, res) {
    api.lightStatus(req.params.id)
        .then(function(result) {
            res.send(result);
        });
});

router.get('/groups/:id/on', function(req, res) {
    api.setGroupLightState(req.params.id, {'on': true})
        .then(function(result) {
            res.sendStatusJson(200);
        })
        .fail(function(error) {
            res.send(error);
        });
});

router.get('/groups/:id/off', function(req, res) {
    api.setGroupLightState(req.params.id, {'on': false})
        .then(function(result) {
            res.sendStatusJson(200);
        })
        .fail(function(error) {
            res.send(error);
        });
});

router.get('/lights/:id/on', function(req, res) {
    api.setLightState(req.params.id, {'on': true})
        .then(function(result) {
            res.send(result);
        })
        .fail(function(error) {
            res.send(error);
        });
});

router.get('/lights/:id/off', function(req, res) {
    api.setLightState(req.params.id, {'on': false})
        .then(function(result) {
            res.send(result);
        })
        .fail(function(error) {
            res.send(error);
        });
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
        });
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
        });
});

router.get('/groups', function(req, res) {
    api.groups()
        .then(function(result) {
            res.send(result);
        });
});
// router.get('/register', function(req, res) {
//     api = new HueApi();
//     api.createUser(hostname, null, null, function(err, user) {
//         if (err) throw err;
//         res.send(user);
//     });
// });

router.get('/on', function(req, res) {
    api.setGroupLightState(0, {'on': true}) // provide a value of false to turn off
        .then(function(result) {
            res.send(result);
        })
        .fail(function(error) {
            res.send(error);
        });
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
            res.sendStatusJson(500);
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
            res.sendStatusJson(500);
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
        });
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
        });
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
            res.sendStatusJson(500);
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
        });
});

router.get('/scenes', function(req, res) {
    api.scenes()
    .then(function(result) {
        res.send(result);
    })
    .fail(function(error) {
        res.send(error);
    });
});

router.get('/scenes/:id/activate', function(req, res) {
    api.activateScene(req.params.id)
    .then(function(result) {
        res.send(result);
    })
    .fail(function(error) {
        res.send(error);
    });
});
*/

module.exports = router;
