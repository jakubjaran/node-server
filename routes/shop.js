const path = require('path');

const express = require('express');

const rootDir = require('../utils/root-dir');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  const products = adminData.products;
  res.render('shop', { prods: products, docTitle: 'MyShop' });
});

module.exports = router;
