const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
// const Snippet = mongoose.model('Snippet');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');
const faker = require('faker');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'An email address is required',
  },
  name: {
    type: String,
    required: 'Please supply a name!',
    trim: true,
  },
  avatar: {
    type: String,
    required: 'Please supply an avatar!',
    trim: true,
  },
  birthday: {
    type: Date,
    required: 'Tell us your birthday!',
  },
  // snippet: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Snippet',
  // },
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
