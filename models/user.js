const { ObjectId } = require('mongodb');

const { getDb } = require('../utils/database');

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  addToCart(product) {
    let updatedCart;
    if (this.cart) {
      const cartProductIndex = this.cart.items.findIndex(p => {
        return p.productId.toString() === product._id.toString();
      });
      const updatedCartItems = [...this.cart.items];
      if (cartProductIndex >= 0) {
        updatedCartItems[cartProductIndex].quantity += 1;
      } else {
        updatedCartItems.push({ productId: product._id, quantity: 1 });
      }
      updatedCart = { items: updatedCartItems };
    } else {
      updatedCart = { items: [{ productId: product._id, quantity: 1 }] };
    }
    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  static findById(userId) {
    const db = getDb();
    return db.collection('users').findOne({ _id: new ObjectId(userId) });
  }
}

module.exports = User;
