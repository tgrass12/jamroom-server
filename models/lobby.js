const mongoose = require('mongoose');
const User = require('./user');

const lobbySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  //TODO: Change host/guests to User models
  host: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  guests: [{
    type: mongoose.Schema.ObjectId,
    ref: "User"
  }],
  currentTrack: {},
  queue: [{}]
});

const Lobby = mongoose.model('Lobby', lobbySchema);

module.exports = Lobby;