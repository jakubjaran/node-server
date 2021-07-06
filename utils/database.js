const { MongoClient } = require('mongodb');

const uri =
  'mongodb+srv://node:node-express1@cluster0.hqcee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const connectMongo = callback => {
  MongoClient.connect(uri)
    .then(client => {
      console.log('Connected!');
      callback(client);
    })
    .catch(err => console.log(err));
};

module.exports = connectMongo;
