const express = require('express');
const bodyParser = require('body-parser');

const mongoClient = require('mongodb').MongoClient;
const dbConnectStr = 'mongodb://localhost:27017/sunset';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/friends', function (req, res) {

  mongoClient.connect(dbConnectStr, (err, db)=> {
    const hobbies = req.body.hobbies;
    const city = req.body.city;
    const age = req.body.age;

    let friends = [];
    let myFriends = [];

    const collection = db.collection('sunsetcol');

    collection.findOne({_id: "12345678900"}, function (err, result) {
      if (err) {
        throw err;
      } else {
        myFriends = result.friends;
      }
    });

    collection.find({city, age}).toArray(function (err, result) {
      result.forEach(element => {
        if (hobbies.every(hobby => element.hobbies.includes(hobby))) {
          friends.push(element.name);
        }
      });

      const newFriends = friends.filter(friend => !myFriends.includes(friend));
      res.send(newFriends);
    });

    db.close();
  });
});

module.exports = app;
