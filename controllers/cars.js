const { response } = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const all = async (req, res) => {
  const result = await mongodb.getDb().db('PersAss').collection('Cars').find();
  if (result.error) {
    res.status(404).json(request.error);
  }
  else {
    result.toArray().then((lists) => {
      res.status(200).json(lists);
    });
  }
};

const one = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  try {
    const result = await mongodb.getDb().db('PersAss').collection('Cars').find({ _id: userId });
    result.toArray().then((lists) => {
      res.status(200).json(lists[0]);
   });
  }
  catch {
    res.status(404).json(result.error)
  }
};

module.exports = { all, one };