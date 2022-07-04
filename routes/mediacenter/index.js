var express = require('express');
var router = express.Router();

var _ = require('lodash');
const axios = require('axios');

const xbmcUrl = `http://${process.env.XBMC_HOST}:${process.env.XBMC_PORT}/jsonrpc`;

const xbmcApiCall = function (method, res) {
    return axios({
        method: 'post',
        url: xbmcUrl,
        data: { jsonrpc: '2.0', id: 1, method: method },
    })
        .then(function (response) {
            return res.sendStatusJson(200);
        })
        .catch(function (err) {
            console.log(err);
            return res.sendStatusJson(500);
        });
};

router.get('/back', function (req, res) {
    return xbmcApiCall('Input.Back', res);
});

router.get('/select', function (req, res) {
    return xbmcApiCall('Input.Select', res);
});

router.get('/right', function (req, res) {
    return xbmcApiCall('Input.Right', res);
});

router.get('/left', function (req, res) {
    return xbmcApiCall('Input.Left', res);
});

router.get('/down', function (req, res) {
    return xbmcApiCall('Input.Down', res);
});

router.get('/up', function (req, res) {
    return xbmcApiCall('Input.Up', res);
});

router.get('/quit', function (req, res) {
    return xbmcApiCall('Application.Quit', res);
});

router.get('/pause', function (req, res) {
    return xbmcApiCall('Player.PlayPause', res);
});

module.exports = router;
