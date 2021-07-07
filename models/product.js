const { ObjectId } = require('mongodb');

const { getDb } = require('../utils/database');

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description.trim();
    this.imageUrl = imageUrl;
    this._id = id ? new ObjectId(id) : null;
  }

  save() {
    const db = getDb();
    let dbOperation;
    if (this._id) {
      dbOperation = db
        .collection('products')
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOperation = db.collection('products').insertOne(this);
    }
    return dbOperation
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => products)
      .catch(err => console.log(err));
  }

  static findById(productId) {
    const db = getDb();
    return db
      .collection('products')
      .find({ _id: new ObjectId(productId) })
      .next()
      .then(product => product)
      .catch(err => console.log(err));
  }

  static deleteById(productId) {
    const db = getDb();
    return db
      .collection('products')
      .deleteOne({ _id: new ObjectId(productId) })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }
}

module.exports = Product;
