const mongoose = require('mongoose');
const Snippet = mongoose.model('Snippet');
const faker = require('faker');

exports.createSnippet = async (req, res) => {
  req.body.author = req.user._id;
  //req.body.avatar = faker.image.avatar;
  const newSnippet = new Snippet(req.body);
  await newSnippet.save();
  req.flash('success', 'Snippet saved');
  res.redirect('back');
};

exports.showAllSnippets = async (req, res) => {
  // Query the DB for a list of all snippets
  const snippets = await Snippet.find();
  snippets.reverse();
  console.log(snippets);
  res.render('homePage', { title: 'Snippets', snippets: snippets });
};

exports.showPersonalSnippets = async (req, res) => {
  const snippets = await Snippet.find({ author: req.user._id });
  snippets.reverse();
  console.log(snippets);
  res.render('yourSnippets', { title: 'Snippets', snippets });
};
