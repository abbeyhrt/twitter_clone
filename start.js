const mongoose = require('mongoose');

// import environment variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connects to DB and handles bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; //In the Wes Bos' code, he uses promises and so i am going to see if i should in this project.
//mongoose.connection.on('error', err => {
// console.error('Technical Difficulties');
//);

//import any models needed(change in future to unhighlighted);
//require('/models/User');

// start app
const app = require('./app');
app.set('port', process.env.PORT || 80);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running -> PORT ${server.address().port}`);
});
