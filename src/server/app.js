const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const config = require('./config');

let database;

app.use(express.static('public'));

app.listen(config.development.port, () => {
  console.log('started on port:', config.development.port);
  MongoClient.connect(config.development.mongourl, (err, db) => {
    if (err)
      throw err;
    database = db.db('vrstore');
    console.log('Mongo db connected');
  })
});

app.get('/get-objects', (req, res) => {
  const { startIndex, endIndex } = req.query;
  database.collection('categories').find({}).skip(parseInt(startIndex)).limit(parseInt(endIndex)).toArray((err, data) => {
    res.json(data);
  })
});
