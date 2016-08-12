var mongodb = require('mongodb');
var express = require('express');
import bodyParser from 'body-parser';
var MongoClient = mongodb.MongoClient;
var app = new express();
var Router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var url = 'mongodb://localhost:27017/sunset';
Router.post('/', (req, res)=>{
  console.log(req.body)
    const insertData = function (db, callback) {
      const collection = db.collection('sunsetcol');
      const data = req.body;
      console.log(data)
      collection.insert(data, function (err, result) {
        if (err) {
          console.log('Error:' + err);
          return;
        }
        callback(result);
      });
    };

    MongoClient.connect(url, function (err, db) {
      console.log("连接成功!");
      insertData(db, function (result) {
        console.log("添加成功!");
        db.close();
      });
    });
})
module.exports = Router;
