var express = require('express');
var Router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/sunset';

Router.post('/leaveMessage',function (req, res) {
  MongoClient.connect(url, (err, db)=> {
    const collection = db.collection('sunsetcol');
    collection.find(req.body).toArray(function (err, result) {
      res.send(result[0].leaveMessage);
      db.close();
    });
  })
});

module.exports=Router;
