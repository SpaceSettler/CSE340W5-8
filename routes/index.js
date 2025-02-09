const routes  = require('express').Router();

routes.use('/cars', require('./cars'));
routes.use('/favCars', require('./favCars'));

module.exports = routes;