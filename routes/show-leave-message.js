var express = require('express');
var Router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/sunset';

Router.post('/leaveMessage', function (req, res) {
  MongoClient.connect(url, (err, db)=> {
    const collection = db.collection('sunsetcol');
    collection.find(req.body).toArray(function (err, result) {
      var message = [];
      if (result[0]) {
        if (Array.isArray(result[0].leaveMessage)) {
          message = result[0].leaveMessage;
        }
      }
      res.send(message);
      db.close();
    });
  })
});

module.exports = Router;
