const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Routes for user login and register path

router.get('/login', userController.loginForm);
router.get('/register', userController.register);

// 1. Validate the registration data
// 2. register the user
// 3. we need to log them in
router.post('/register', userController.validateRegister);

module.exports = router;
