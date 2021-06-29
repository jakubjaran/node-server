const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    docTitle: 'MyShop Admin - Add Product',
    editMode: false,
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      docTitle: 'MyShop Admin - All Products',
    });
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const productId = req.params.productId;
  Product.findById(productId, product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      docTitle: 'MyShop Admin - Edit Product',
      editMode: true,
      product: product,
    });
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(title, imageUrl, price, description);
  product.save();
  res.redirect('/admin/products');
};
