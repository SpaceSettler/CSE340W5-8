const routes  = require('express').Router();
const myController = require('../controllers/cars');
const { userValidationRules, validate } = require('../validator.js');

routes.get('/', myController.all);
routes.get('/:id', userValidationRules(), validate, myController.one);

module.exports = routes;