'use strict';

const faker = require('faker');
const mongoose = require('mongoose');
const promisify = require('es6-promisify');

// import environment variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connects to DB and handles bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', err => {
  console.error(err);
});

//import any models needed(change in future to unhighlighted);
require('../models/User');
require('../models/Snippet');

const User = mongoose.model('User');
const Snippet = mongoose.model('Snippet');

// You'd want to make `n` users with `m` snippets

const USERS_COUNT = 10;

const random = ceil => Math.floor(Math.random() * ceil) + 1;

const drop = async () => {
  console.log('Dropping collections...');
  try {
    await Snippet.collection.drop();
    await User.collection.drop();
  } catch (error) {}
};

const seed = async () => {
  console.log('Running seeds...');
  await drop();

  console.log('Seeding users...');
  const seedUsers = Array(USERS_COUNT)
    .fill(null)
    .map(() => ({
      name: faker.name.findName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      // password: faker.internet.password(),
      password: 'password',
    }))
    .concat({
      name: 'Abbey Hart',
      email: 'test@test.com',
      password: 'test',
      avatar: faker.image.avatar(),
    })
    .map(async user => {
      const register = promisify(User.register, User);

      return await register(
        new User({
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        }),
        user.password
      );
    });
  const users = await Promise.all(seedUsers);

  console.log('Seeding snippets...');
  await Promise.all(
    users.map(async user => {
      const snippets = Array(random(10))
        .fill(null)
        .map(() =>
          new Snippet({
            author: user._id,
            text: faker.lorem.sentence(),
          }).save()
        );

      await Promise.all(snippets);
    })
  );
};

seed()
  .then(() => {
    console.log('Done!');
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(error);
    mongoose.connection.close();
  });
