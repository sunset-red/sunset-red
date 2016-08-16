var express = require('express');
var Router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/sunset';

Router.post('/relase', function (req, res) {
  MongoClient.connect(url, (err, db)=> {
    const collection = db.collection('sunsetcol');
    if (req.body.says) {
      collection.updateOne({userId: req.body.userId}, {$addToSet: {says: req.body.says}});
    }
    collection.find({userId: req.body.userId}).toArray((err, result)=> {
      res.send(result[0].says.reverse());
    });
    db.close();
  })
});
module.exports = Router;
