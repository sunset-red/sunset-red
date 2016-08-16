const express = require('express');

const mongoClient = require('mongodb').MongoClient;
const dbConnectStr = 'mongodb://localhost:27017/sunset';

const app = express();

app.get('/userName/:userId', function (req, res) {

  const userId = req.params.userId;

  mongoClient.connect(dbConnectStr, (err, db)=> {
    const collection = db.collection('sunsetcol');

    collection.findOne({userId}, function (err, result) {
      if (err) {
        throw err;
      } else {
        res.send(result.name);
      }
    });

    db.close();
  });
});

module.exports = app;
