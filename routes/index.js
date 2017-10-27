const express = require('express');
const morgan = require('morgan');
const router = express.Router();
const userController = require('../controllers/userController');

router.use(morgan('dev'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout', { title: 'FauxTweet' });
});

router.get('/flash', function(req, res) {
  req.flash('info', 'Hi there!');
  res.redirect('/');
});

// Routes for user login and register path

router.get('/login', userController.loginForm);
router.get('/register', userController.registerForm);

// 1. Validate the registration data
// 2. register the user
// 3. we need to log them in
router.post(
  '/register',
  userController.validateRegister,
  userController.register
);

module.exports = router;
