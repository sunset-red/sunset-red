const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const mongoClient = require('mongodb').MongoClient;
const dbURL = 'mongodb://localhost:27017/sunset';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.put('/leaveWord', function (req, res) {
  mongoClient.connect(dbURL, (err, db)=> {
    const collection = db.collection('sunsetcol');

    collection.update({_id: req.body._id}, {
      $push: {
        leaveMessage: {
          name: req.body.name,
          words: req.body.words,
          date: req.body.date
        }
      }
    })
  })
});

module.exports = app;
