const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    docTitle: 'MyShop Admin - Add Product',
    editMode: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const newProduct = new Product(
    title,
    price,
    description,
    imageUrl,
    null,
    req.user._id
  );
  newProduct.save().then(() => {
    res.redirect('/admin/products');
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        docTitle: 'MyShop Admin - All Products',
      });
    })
    .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const productId = req.params.productId;
  Product.findById(productId)
    .then(product => {
      if (!product) {
        return res.redirect('/admin/products');
      }
      res.render('admin/edit-product', {
        docTitle: 'MyShop Admin - Edit Product',
        editMode: true,
        product: product,
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, imageUrl, price, description } = req.body;
  const updatedProduct = new Product(
    title,
    price,
    description,
    imageUrl,
    productId,
    req.user._id
  );
  updatedProduct
    .save()
    .then(result => {
      console.log('Product updated!');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.deleteById(productId)
    .then(() => {
      console.log('Product deleted!');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};
