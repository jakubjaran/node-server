const { MongoClient } = require('mongodb');

const uri =
  'mongodb+srv://node:node-express1@cluster0.hqcee.mongodb.net/shop?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let _db;

const connectMongo = callback => {
  client
    .connect()
    .then(client => {
      console.log('Connected!');
      _db = client.db;
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database connected!';
};

exports.connectMongo = connectMongo;
exports.getDb = getDb;
