const { getDb } = require('../utils/database');

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description.trim();
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDb();
    return db
      .collection('products')
      .insertOne(this)
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
}

module.exports = Product;
