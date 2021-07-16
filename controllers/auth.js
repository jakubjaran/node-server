const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  res.render('auth/login', {
    docTitle: 'MyShop - Login',
    isAuth: req.session.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('60ed67aebb982738f632c952')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
    })
    .then(() => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
};
