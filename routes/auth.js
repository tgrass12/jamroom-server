const express = require('express');
const router = express.Router();
const { signin, signup } = require('../handlers/auth');

router.post('/signin', signin)
  .post('/signup', signup);

module.exports = router;