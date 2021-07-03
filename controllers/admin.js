const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    docTitle: 'MyShop Admin - Add Product',
    editMode: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  Product.create({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
  })
    .then(result => {
      console.log(result);
      // res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, _]) => {
      res.render('admin/products', {
        prods: rows,
        docTitle: 'MyShop Admin - All Products',
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const productId = req.params.productId;
  Product.findById(productId)
    .then(([products, _]) => {
      if (products.length < 1) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        docTitle: 'MyShop Admin - Edit Product',
        editMode: true,
        product: products[0],
      });
    })
    .catch();
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, imageUrl, price, description } = req.body;
  const updatedProduct = new Product(
    productId,
    title,
    imageUrl,
    price,
    description
  );
  //this should update product not save new product
  updatedProduct
    .save()
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.deleteById(productId);
  res.redirect('/admin/products');
};
