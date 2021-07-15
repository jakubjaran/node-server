exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    docTitle: 'MyShop - Login',
  });
};

exports.postLogin = (req, res, next) => {
  res.setHeader('Set-Cookie', 'isLoggedIn=true');
  res.redirect('/');
};
