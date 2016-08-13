var express = require('express');
var app = new express();
var Router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/sunset';

Router.post('/login',function (req, res) {
  MongoClient.connect(url, (err, db)=> {
    const collection = db.collection('sunsetcol');
    collection.find(req.body).toArray(function (err, result) {
      res.send(result);
      db.close();
    });
  })
});
module.exports=Router;
