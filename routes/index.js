const express = require('express');
const morgan = require('morgan');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');
const snippetController = require('../controllers/snippetController');

router.use(morgan('dev'));

/* GET home page. */

router.get('/flash', function(req, res) {
  req.flash('info', 'Hi there!');
  res.redirect('/');
});

// Routes for user login and register path

//userController.loginForm is fucking needed just by the way
//router.get('/login', userController.loginForm);
router.get(
  '/',
  authController.isLoggedIn,
  catchErrors(snippetController.showAllSnippets)
);
router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/register', userController.registerForm);

// 1. Validate the registration data
// 2. register the user
// 3. we need to log them in
router.post(
  '/register',
  userController.validateRegister,
  userController.register,
  authController.login
);

router.get('/logout', authController.logout);

router.get('/account', authController.isLoggedIn, userController.account);
router.get('/account/edit', userController.editAccount);
router.post('/account/edit', catchErrors(userController.updateAccount));
router.get('/account/snippets', snippetController.showPersonalSnippets);

router.get('/users', catchErrors(userController.showAllUsers));
router.get('/user/:id', catchErrors(userController.publicProfile));

//router.get('/snippets');
router.post('/snippets/:id', catchErrors(snippetController.createSnippet));
//router.get('/snippets/edit')
//router.get('/snippets/:id');
//router.get('/snippets/all');
module.exports = router;
