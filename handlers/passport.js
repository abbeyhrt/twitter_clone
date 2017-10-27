const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(User.createStrategy());

// every single time you have a request it will ask passport what we should do with the user now that they are logged in
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
