const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const md5 = require('md5');
const validator = require('validator');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Inavlied Email Address'],
    required: 'An email address is required',
  },
  name: {
    type: String,
    required: 'Please supply a name!',
    trim: true,
  },
});

userSchema.plugin(passportLocalMongooseEmail, { usernameField: 'email' });

module.exports = mongoose.model('User');
