const passport = require('passport');
// logging someone in is called a strategy
//s strategy is something that will interface with checking if you are
//allowed to be logged (do something)
// a local strategy will check in whether or not the password and suername works.

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Username and/or Password are incorrect!',
  successRedirect: '/',
  successFlash: 'Welcome!',
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'Goodbye!');
  res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next(); //they are logged in carry on
    return;
  }
  req.flash('error', 'Oops! You must be logged in the view this page!');
  res.redirect('/login');
};
