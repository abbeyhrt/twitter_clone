const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const Snippet = mongoose.model('Snippet');

exports.loginForm = (req, res) => {
  res.render('login', { title: 'Login' });
};

exports.registerForm = (req, res) => {
  res.render('register', { title: 'Sign Up' });
};

// a middleware to validare the register
//checks a lot of different things, like the email
// to make sure all is good before sending over the user

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'You must supply a name!').notEmpty();
  req.checkBody('email', 'That Email is not valid!').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false,
  });
  req.checkBody('password', 'Password cannot be empty!').notEmpty();
  req
    .checkBody('password-confirm', 'Confirmed Password cannot be empty!')
    .notEmpty();
  req
    .checkBody('password-confirm', 'Oops! Your passwords do not match!')
    .equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.render('register', {
      title: 'Sign Up',
      body: req.body,
      flashes: req.flash(),
    });
    return;
  }
  next();
};

exports.register = async (req, res, next) => {
  const user = new User({ email: req.body.email, name: req.body.name });
  const register = promisify(User.register, User);
  await register(user, req.body.password);
  // trying to see if this will solve the author.name problem
  //  req.body.author = req.user_id;
  next();
};

exports.account = (req, res) => {
  res.render('account', { title: 'Account Information' });
};

exports.editAccount = (req, res) => {
  res.render('editAccount', { title: 'Edit Your Account' });
};

exports.updateAccount = async (req, res) => {
  const updates = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: updates },
    { new: true, runValidators: true, context: 'query' }
  );
  req.flash('success', 'Account Info Updated!');
  res.redirect('/account');
};

exports.publicProfile = async (req, res) => {
  const user = await res.render('publicProfile', { title: 'Snippets' });
};

exports.showAllUsers = async (req, res) => {
  const users = await User.find();
  console.log(users);
  res.render('users', { title: 'Snippets', users });
};
