const express = require('express');
const bodyParser = require('body-parser');

const mongoClient = require('mongodb').MongoClient;
const dbConnectStr = 'mongodb://localhost:27017/sunset';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/myFriends/:_id', function (req, res) {

  const _id = req.params._id;
  mongoClient.connect(dbConnectStr, (err, db)=> {
    const collection = db.collection('sunsetcol');

    collection.findOne({_id}, function (err, result) {
      if (err) {
        throw err;
      } else {
        res.send(result.friends);
      }
    });

    db.close();
  });
});

module.exports = app;
