var express = require('express');
var Router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/sunset';

Router.post('/dynamics', function (req, res) {
  MongoClient.connect(url, (err, db)=> {
    const collection = db.collection('sunsetcol');

    if (req.body.dynamic) {
      collection.updateOne({userId: req.body.userId}, {
        $addToSet: {
          dynamics: {
            dynamic: req.body.dynamic,
            time: req.body.time
          }
        }
      });
    }
    var dynamics = [];
    collection.find({userId: req.body.userId}).toArray((err, result)=> {
      if (Array.isArray(result[0].dynamics)) {
        dynamics = result[0].dynamics.reverse();
      }
      res.send(dynamics);
    });
    db.close();
  })
});
module.exports = Router;
