const { Schema, SchemaTypes, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: SchemaTypes.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  let updatedCart;
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
  this.cart = updatedCart;
  return this.save();
};

module.exports = model('User', userSchema);
