const products = [];

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', { docTitle: 'MyShop - Add Product' });
};

exports.postAddProduct = (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  res.render('shop', {
    prods: products,
    docTitle: 'MyShop',
  });
};
