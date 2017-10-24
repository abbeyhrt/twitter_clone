//const mongoose = require('mongoose');

exports.loginForm = (req, res) => {
  res.render('login', { title: 'Login' });
};

exports.register = (req, res) => {
  res.render('register', { title: 'Register' });
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
      title: 'Register',
      body: req.body,
      flashes: req.flash(),
    });
  }
};
