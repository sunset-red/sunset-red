const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const mongoClient = require('mongodb').MongoClient;
const dbURL = 'mongodb://localhost:27017/sunset';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.put('/modifyPersonMessage', function (req, res) {
  mongoClient.connect(dbURL, (err, db)=> {
    const collection = db.collection('sunsetcol');
    // console.log(req.body.userId);
    collection.update({userId: req.body.userId}, {
      $set: {
        password: req.body.password,
        authention: {
          question: req.body.authention.question,
          answer: req.body.authention.answer,
        },
        hobbies: req.body.hobbies,
        age: req.body.age,
        city: req.body.city
      }
    })
    res.sendStatus(200);
  })
});

module.exports = app;
