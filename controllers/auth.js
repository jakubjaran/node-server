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
      req.session.save(err => {
        console.log(err);
        res.redirect('/');
      });
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    docTitle: 'MyShop - Signup',
    isAuth: req.session.isLoggedIn,
  });
};

exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        return res.redirect('/signup');
      }
      const newUser = new User({
        email: email,
        password: password,
        cart: { items: [] },
      });
      return newUser.save();
    })
    .then(result => {
      res.redirect('/login');
    })
    .catch();
};
