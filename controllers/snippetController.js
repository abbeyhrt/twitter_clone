const mongoose = require('mongoose');
const Snippet = mongoose.model('Snippet');

exports.createSnippet = async (req, res) => {
  req.body.author = req.user._id;

  const newSnippet = new Snippet(req.body);
  await newSnippet.save();
  req.flash('success', 'Snippet saved');
  res.redirect('back');
};

exports.showAllSnippets = async (req, res) => {
  // Query the DB for a list of all snippets
  const snippets = await Snippet.find();
  console.log(snippets);
  res.render('homePage', { title: 'Snippets', snippets: snippets });
};
