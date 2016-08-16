const express = require('express');
const bodyParser = require('body-parser');

const mongoClient = require('mongodb').MongoClient;
const dbConnectStr = 'mongodb://localhost:27017/sunset';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/friends/:userId', function (req, res) {
  const userId = req.params.userId
  const hobbies = req.body.hobbies;
  const city = req.body.city;
  const age = req.body.age;

  mongoClient.connect(dbConnectStr, (err, db)=> {
    const friends = [];
    let myFriends = [];
    let myself;

    const collection = db.collection('sunsetcol');

    collection.findOne({userId}, function (err, result) {
      if (err) {
        throw err;
      } else {
        myFriends = result.friends;
        myself = result.name;
      }
    });

    collection.find({city, age}).toArray(function (err, result) {
      result.forEach(element => {
        if (hobbies.every(hobby => element.hobbies.includes(hobby))) {
          friends.push(element.name);
        }
      });

      friends.splice(friends.indexOf(myself), 1);
      const newFriends = friends.filter(friend => !myFriends.includes(friend));
      res.send(newFriends);
    });

    db.close();
  });
});

module.exports = app;
