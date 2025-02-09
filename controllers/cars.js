const { response } = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const all = async (req, res) => {
  const result = await mongodb.getDb().db('PersAss').collection('Cars').find();
  result.toArray().then((lists) => {
    res.status(200).json(lists);
  });
};

const one = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('PersAss').collection('Cars').find({ _id: userId });
  result.toArray().then((lists) => {
    res.status(200).json(lists[0]);
  });
};

module.exports = { all, one };