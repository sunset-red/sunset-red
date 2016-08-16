const express = require('express');
const bodyParser = require('body-parser');

const mongoClient = require('mongodb').MongoClient;
const dbConnectStr = 'mongodb://localhost:27017/sunset';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/attention/:userId', function (req, res) {

  const userId = req.params.userId;
  const attentionFriend = req.body.attentionFriend;

  mongoClient.connect(dbConnectStr, (err, db)=> {
    const collection = db.collection('sunsetcol');

    collection.updateOne({userId}, {$addToSet: {friends: attentionFriend}}, function (err) {
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
