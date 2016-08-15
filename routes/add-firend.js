const express = require('express');
const bodyParser = require('body-parser');

const mongoClient = require('mongodb').MongoClient;
const dbConnectStr = 'mongodb://localhost:27017/sunset';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/attention/:userName', function (req, res) {

  const name = req.params.userName;
  const attentionFriend = req.body.attentionFriend;

  mongoClient.connect(dbConnectStr, (err, db)=> {
    const collection = db.collection('sunsetcol');

    collection.updateOne({name}, {$addToSet: {friends: attentionFriend}}, function (err) {
      if (err) {
        throw err;
      } else {
        res.send('关注成功！');
      }
    });

    db.close();
  });
});

module.exports = app;
