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

  getCart() {
    if (!this.cart) {
      this.cart = { items: [] };
    }
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        let cartProducts = this.cart.items.map(cp => {
          const p = products.find(
            prod => prod._id.toString() === cp.productId.toString()
          );
          return { ...p, quantity: p ? cp.quantity : null };
        });
        cartProducts = cartProducts.filter(cp => cp.quantity !== null);
        if (cartProducts.length < 1 && this.cart.items.length > 0) {
          this.cart = { items: [] };
          db.collection('users').updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: { items: cartProducts } } }
          );
        }
        return cartProducts;
      });
  }

  removeFromCart(productId) {
    const updatedCartItems = this.cart.items.filter(
      item => item.productId.toString() !== productId.toString()
    );
    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedCartItems } } }
      );
  }

  createOrder() {
    const db = getDb();
    return this.getCart()
      .then(products => {
        const order = {
          items: products,
          user: {
            _id: new ObjectId(this._id),
            username: this.username,
            email: this.email,
          },
        };
        return db.collection('orders').insertOne(order);
      })
      .then(result => {
        this.cart = { items: [] };
        return db
          .collection('users')
          .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: { items: [] } } }
          );
      });
  }

  getOrders() {
    const db = getDb();
    return db
      .collection('orders')
      .find({ 'user._id': new ObjectId(this._id) })
      .toArray();
  }

  static findById(userId) {
    const db = getDb();
    return db.collection('users').findOne({ _id: new ObjectId(userId) });
  }
}

module.exports = User;
