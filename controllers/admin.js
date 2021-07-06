const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    docTitle: 'MyShop Admin - Add Product',
    editMode: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const newProduct = new Product(title, price, description, imageUrl);
  newProduct.save();
  res.redirect('/admin/products');
};

// exports.getProducts = (req, res, next) => {
//   req.user
//     .getProducts()
//     .then(products => {
//       res.render('admin/products', {
//         prods: products,
//         docTitle: 'MyShop Admin - All Products',
//       });
//     })
//     .catch(err => console.log(err));
// };

// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect('/');
//   }
//   const productId = req.params.productId;
//   Product.findByPk(productId)
//     .then(product => {
//       if (!product) {
//         return res.redirect('/admin/products');
//       }
//       res.render('admin/edit-product', {
//         docTitle: 'MyShop Admin - Edit Product',
//         editMode: true,
//         product: product,
//       });
//     })
//     .catch(err => console.log(err));
// };

// exports.postEditProduct = (req, res, next) => {
//   const { productId, title, imageUrl, price, description } = req.body;
//   Product.findByPk(productId)
//     .then(product => {
//       product.title = title;
//       product.imageUrl = imageUrl;
//       product.price = price;
//       product.description = description;
//       return product.save();
//     })
//     .then(result => {
//       console.log('Product updated!');
//       res.redirect('/admin/products');
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// exports.postDeleteProduct = (req, res, next) => {
//   const productId = req.body.productId;
//   Product.findByPk(productId)
//     .then(product => {
//       return product.destroy();
//     })
//     .then(result => {
//       console.log('Product deleted!');
//       res.redirect('/admin/products');
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };
