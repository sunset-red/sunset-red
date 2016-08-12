"use strict";

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/ceshi';

exports.findItem = function (req, res) {
  MongoClient.connect(url, (err, db)=> {
    const collection = db.collection('tb2');
    collection.find(req.body, {'_id': 0}).toArray(function (err, result) {
      res.send(result);
      db.close();
    });
  })
};
