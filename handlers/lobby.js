const db = require('../models');

exports.createLobby = async function(req, res, next) {
  try {
    const lobby = await db.Lobby.create({
      name: req.body.name,
      host: req.body.hostId,
    });
    return res.status(200).json(lobby);
  } catch(err) {
    return next(err);
  }
}

exports.getLobby = async function(req, res, next) {
  try {
    const lobby = await db.Lobby.findById(req.params.lobby_id)
      .populate('host', {
        username: true
      })
      .populate('guests', {
        username: true
      });
    return res.status(200).json(lobby);
  } catch(err) {
    return next(err);
  }
}

exports.deleteLobby = async function(req, res, next) {
  try {
    const lobby = await db.Lobby.findById(req.params.lobby_id);
    await lobby.remove();
    return res.status(200).json(lobby);
  } catch(err) {
    return next(err);
  }
}

exports.addTrackToLobbyQueue = async function(req, res, next) {
  try {
    const lobby = await db.Lobby.findById(req.params.lobby_id);
    const track = {
      artist: req.body.artist,
      title: req.body.title,
      albumArt: req.body.albumArt,
      uri: req.body.uri,
      queueId: req.body.uid
    }

    lobby.queue.push(track);
    await lobby.save();
    return res.status(200).json(lobby);

  } catch(err) {
    return next(err);
  }
}

exports.removeTrackFromLobbyQueue = async function(req, res, next) {
  try {
    const lobby = await db.Lobby.findById(req.params.lobby_id);
    lobby.queue = lobby.queue.filter(t => t.queueId !== req.params.track_id);
    await lobby.save();
    return res.status(200).json(lobby);
  } catch(err) {
    return next(err);
  }
}

exports.getLobbyQueue = async function(req, res, next) {
  try {
    const lobby = await db.Lobby.findById(req.params.lobby_id)
    return res.status(200).json(lobby.queue);
  } catch(err) {
    return next(err);
  }
}