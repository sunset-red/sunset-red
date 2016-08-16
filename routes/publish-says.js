var express = require('express');
var Router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/sunset';

Router.post('/dynamics', function (req, res) {
  MongoClient.connect(url, (err, db)=> {
    const collection = db.collection('sunsetcol');
    if (req.body.dynamic) {
      collection.updateOne({_id: req.body._id}, {
        $addToSet: {
          dynamics: {
            dynamic: req.body.dynamic,
            time: req.body.time
          }
        }
      });
    }
    var dynamics = [];
    collection.find({_id: req.body._id}).toArray((err, result)=> {
      if (Array.isArray(result[0].dynamics)) {
        dynamics = result[0].dynamics.reverse();
      }
      res.send(dynamics);
    });
    db.close();
  })
});
module.exports = Router;
