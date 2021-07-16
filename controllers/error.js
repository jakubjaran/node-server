exports.getPage404 = (req, res, next) => {
  res
    .status(404)
    .render('page-404', {
      docTitle: 'MyShop - Page Not Found',
      isAuth: req.session.isLoggedIn,
    });
};
