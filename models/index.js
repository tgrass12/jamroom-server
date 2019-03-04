const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.set('debug', true);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/jamroom', {
  keepAlive: true,
  useNewUrlParser: true
});

module.exports.User = require('./user');
module.exports.Lobby = require('./lobby');