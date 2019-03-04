const express = require('express');
const router = express.Router({ mergeParams: true });

const { 
  createLobby, 
  getLobby,
  deleteLobby,
  getLobbyQueue,
  addTrackToLobbyQueue,
  removeTrackFromLobbyQueue
} = require('../handlers/lobby');

router.route('/')
  .post(createLobby);

router.route('/:lobby_id')
  .get(getLobby)
  .delete(deleteLobby);

router.route('/:lobby_id/queue')
  .get(getLobbyQueue)
  .post(addTrackToLobbyQueue);

router.route('/:lobby_id/queue/:track_id')
  .delete(removeTrackFromLobbyQueue);

module.exports = router;