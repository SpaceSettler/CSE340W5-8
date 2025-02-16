const routes  = require('express').Router();
const myController = require('../controllers/favCars');
const { userValidationRules, userValidationRulesPut, validate } = require('../validator.js');

routes.get('/', myController.all);
routes.get('/:id', userValidationRules(), validate, myController.one);
routes.post('/:id', userValidationRules(), validate, myController.postThis);
routes.put('/:id', userValidationRulesPut(), validate, myController.putThis);
routes.delete('/:id', userValidationRules(), validate, myController.deleteThis);

module.exports = routes;