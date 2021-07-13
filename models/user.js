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
        productId: { type: SchemaTypes.ObjectId, required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

module.exports = model('User', userSchema);
