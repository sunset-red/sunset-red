var express = require('express');
var Router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/sunset';

Router.post('/sessions', function (req, res) {
  MongoClient.connect(url, (err, db)=> {
    const collection = db.collection('sunsetcol');
    collection.find({_id: req.body._id}).toArray(function (err, result) {
      let findResult = false;
      if (result[0] && result[0].password === req.body.password) {
        findResult = true;
        res.send(findResult);
      }
      else {
        res.send(findResult);
      }
      db.close();
    });
  })
});
module.exports = Router;
