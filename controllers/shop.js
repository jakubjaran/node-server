const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        docTitle: 'MyShop',
      });
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        docTitle: 'MyShop - All Products',
      });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then(product => {
      res.render('shop/product-details.ejs', {
        docTitle: `MyShop - ${product.title}`,
        product: product,
      });
    })
    .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(products => {
      res.render('shop/cart', {
        docTitle: 'MyShop - Your Cart',
        products: products,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postDeleteCartItem = (req, res, next) => {
  const productId = req.body.productId;
  req.user
    .removeFromCart(productId)
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then(orders => {
      res.render('shop/orders', {
        docTitle: 'MyShop - Your Orders',
        orders: orders,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postCreateOrder = (req, res, next) => {
  req.user
    .createOrder()
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => {
      console.log(err);
    });
};

// exports.getCheckout = (req, res, next) => {
//   res.render('shop/checkout', {
//     docTitle: 'MyShop - Checkout',
//   });
// };
