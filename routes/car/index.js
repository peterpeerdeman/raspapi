const express = require('express');
const router = express.Router();

const car = require('../../modules/car');

router.get('/charge', function(req, res) {
    car.getCharge().then((result) => {
        res.send(result);
    });
});

module.exports = router;
