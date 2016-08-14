const express = require('express');
const bodyParser = require('body-parser');

const mongoClient = require('mongodb').MongoClient;
const dbConnectStr = 'mongodb://localhost:27017/sunset';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/friends', function (req, res) {

  mongoClient.connect(dbConnectStr, (err, db)=> {
    const collection = db.collection('sunsetcol');
    const hobbies = req.body.hobbies;
    const city = req.body.city;
    const age = req.body.age;

    let friends = [];

    collection.find({city, age}).toArray(function (err, result) {
      result.forEach(element => {
        hobbies.every(hobby => {
          if (element.hobbies.includes(hobby)) {
            if (!friends.some(friend => element === friend)) {
              friends.push(element);
            }
          }
        })
      });
      res.send(friends);
    });

    db.close();
  });
});

module.exports = app;
