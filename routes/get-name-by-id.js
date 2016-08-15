const express = require('express');

const mongoClient = require('mongodb').MongoClient;
const dbConnectStr = 'mongodb://localhost:27017/sunset';

const app = express();

app.get('/userName/:_id', function (req, res) {

  const _id = req.params._id;

  mongoClient.connect(dbConnectStr, (err, db)=> {
    const collection = db.collection('sunsetcol');

    collection.findOne({_id}, function (err, result) {
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
