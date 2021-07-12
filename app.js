const path = require('path');

const express = require('express');
const mongoose = require('mongoose');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById('60e6997e11ded4abe2273510')
//     .then(user => {
//       req.user = new User(user.username, user.email, user.cart, user._id);
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

const errorController = require('./controllers/error');

app.use(errorController.getPage404);

const dbUri =
  'mongodb+srv://node:node-express1@cluster0.hqcee.mongodb.net/shop?retryWrites=true&w=majority';

mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
