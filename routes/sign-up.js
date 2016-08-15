var mongodb = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = mongodb.MongoClient;
var app = new express();
var Router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var url = 'mongodb://localhost:27017/sunset';

Router.post('/passwordVerify', (req, res)=>{
  MongoClient.connect(url, (err, db)=> {
    const collection = db.collection('sunsetcol');
    collection.find(req.body).toArray(function (err, result) {
      res.send(result);
      db.close();
    });
  })
});

Router.post('/nameVerify', (req, res)=>{
  MongoClient.connect(url, (err, db)=> {
    const collection = db.collection('sunsetcol');
    collection.find(req.body).toArray(function (err, result) {
      res.send(result);
      db.close();
    });
  })
});

Router.post('/signup', (req, res)=>{
  MongoClient.connect(url, (err, db)=> {
    const collection = db.collection('sunsetcol');
    collection.insert(req.body,function (err, result) {
      if(err){
        console.log(err);
      }
      db.close();
    });
  });
});
module.exports = Router;
