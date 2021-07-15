exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    docTitle: 'MyShop - Login',
  });
};
