var express = require('express');
var bodyParser = require('body-parser');
var app = new express();

const MongoClient = require('mongodb').MongoClient;
const dbURL = 'mongodb://localhost:27017/sunset';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/leaveMessage', function (req, res) {
  MongoClient.connect(dbURL, (err, db)=> {
    const collection = db.collection('sunsetcol');
    if (req.body.words) {
      collection.update({userId: req.body.userId}, {
        $push: {
          leaveMessage: {
            name: req.body.name,
            words: req.body.words,
            date: req.body.date
          }
        }
      })
    }

    collection.find({userId: req.body.userId}).toArray(function (err, result) {
      var message = [];
      if (result[0]) {
        if (Array.isArray(result[0].leaveMessage)) {
          message = result[0].leaveMessage;
        }
      }
      res.send(message);
      db.close();
    });
  });
});

module.exports = app;

