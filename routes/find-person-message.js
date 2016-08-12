const MongoClient = require('mongodb').MongoClient;
const DB_CONN_STR = 'mongodb://localhost:27017/sunset';

exports.save = function (req, res) {
  const selectData = function (db, callback) {
    const collection = db.collection('sunsetcol');
    const data = req.body;
    collection.find(data).toArray(function (err, result) {
      if (err) {
        console.log('Error:' + err);
        return;
      }
      callback(result[0]);
    });
  };

  MongoClient.connect(DB_CONN_STR, function (err, db) {
    console.log("连接成功!");
    selectData(db, function (result) {
      db.close();
      res.json(result).end();
    });
  });
};
