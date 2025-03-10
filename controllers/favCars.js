const { response } = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const all = async (req, res) => {
  const result = await mongodb.getDb().db().collection('FavCars').find();
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
    const result = await mongodb.getDb().db().collection('FavCars').find({ _id: userId });
      result.toArray().then((lists) => {
        res.status(200).json(lists[0]);
      });
  }
  catch {
      res.status(500).json(result.error)
  }
};

const putThis = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('FavCars').updateOne({ _id: userId }, { $set: req.body });
  if (result.error) {
    res.status(500).json(result.error);
  }
  else {
    res.status(204).json();
  };
};

const postThis = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const request = await mongodb.getDb().db().collection('Cars').find({ _id: userId });
    if (request.error) {
      res.status(404).json(request.error);
    }
    else {
      request.toArray().then((lists) => {
          const result = mongodb.getDb().db().collection('FavCars').insertOne(lists[0]);
          res.status(201).json(lists[0]._id);
      });
    }
};

const deleteThis = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const request = await mongodb.getDb().db().collection('FavCars').deleteMany({ _id: userId });
  if (request.error || request.deletedCount === 0) {
    res.status(500).json(request.error);
  }
  else {
    res.status(200).json(request);
  }
};

module.exports = { all, one, putThis, postThis, deleteThis };