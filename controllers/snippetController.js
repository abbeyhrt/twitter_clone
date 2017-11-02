const mongoose = require('mongoose');
const Snippet = mongoose.model('Snippet');

exports.addSnippet = async (req, res) => {
  req.body.author = req.user._id;

  const newSnippet = new Snippet(req.body);
  await newSnippet.save();
  req.flash('success', 'Snippet saved');
  res.redirect('back');
};
