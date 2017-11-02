const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
//const mongodbErrorHandler = require('mongoose-mongodb-errors');
//const passportLocalMongoose = require('passport-local-mongoose');

const snippetSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must have an author',
  },
  text: {
    type: String,
    required:
      'Your snippet is empty! Fill it with your beautiful thoughts and feelings',
  },
});

module.exports = mongoose.model('Snippet', snippetSchema);
