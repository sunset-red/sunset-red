const express = require('express');
const bodyParser = require('body-parser');

const mongoClient = require('mongodb').MongoClient;
const dbConnectStr = 'mongodb://localhost:27017/sunset';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/hobbies', function (req, res) {
  console.log(req.body);
  const findAllItems = function (db, callback) {

    const collection = db.collection('col');

    collection.find(req.body, {'_id': 0}).toArray(function (err, result) {
      if (err) {
        throw err;
      }
      callback(result);
    });
  };

  mongoClient.connect(dbConnectStr, function (err, db) {
    if (err) {
      throw err;
    }
    findAllItems(db, function (result) {
      // console.log(result);
      res.send(result);
      db.close();
    })
  });
});

module.exports = app;
