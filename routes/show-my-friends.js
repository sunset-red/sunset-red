const express = require('express');
const bodyParser = require('body-parser');

const mongoClient = require('mongodb').MongoClient;
const dbConnectStr = 'mongodb://localhost:27017/sunset';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/myFriends/:userName', function (req, res) {

  const userName = req.params.userName;
  mongoClient.connect(dbConnectStr, (err, db)=> {
    const collection = db.collection('sunsetcol');

    collection.findOne({name:userName}, function (err, result) {
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
