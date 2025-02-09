const routes  = require('express').Router();

const myController = require('../controllers/cars');

routes.get('/', myController.all);
routes.get('/:id', myController.one);

module.exports = routes;