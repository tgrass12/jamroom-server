require('dotenv').load();
const express = require('express');
const router = express.Router({mergeParams: true});
const axios = require('axios');

router.get("/signin", (req, res, next) => {
  const scopes = [
    'user-read-playback-state',
    'user-modify-playback-state',
    'streaming',
    'user-read-birthdate',
    'user-read-email',
    'user-read-private'
   ].join(' ');
  const loginUrlBase = `http://accounts.spotify.com/authorize?response_type=code`;
  const loginParams = `&scope=${scopes}&client_id=${process.env.SPOTIFY_CLIENT_ID}&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}`;
  res.send(`${loginUrlBase}${loginParams}`);
});

router.post("/connect", (req, res, next) => {
  const code = req.body.code;
  const client = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  const encoded = new Buffer.from(client).toString('base64');
  const authHeader = `Basic ${encoded}`;
  const payload = `code=${code}&grant_type=authorization_code&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}`;
  axios.post(
    'https://accounts.spotify.com/api/token',
    payload,
    {
      'headers': 
        { 
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': authHeader
        }
    }
  )  
    .then(response => {
      res.status(200).send(response.data);
    })
    .catch(err => {
      let error;
      if (!err) 
      {
        res.status(500).send('Unexpected Error');
      }
      
      res.status(400).send(err.response.data.error_description); 
    });
});

router.post("/refresh", (req, res, next) => {
  const payload = `grant_type=refresh_token&refresh_token=${req.body.token}`;
  const client = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  const encoded = new Buffer.from(client).toString('base64');
  const authHeader = `Basic ${encoded}`;
  axios.post(
    'https://accounts.spotify.com/api/token',
    payload,
    {
      'headers': 
        { 
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': authHeader
        }
    }
  )  
    .then(response => {
      res.status(200).send(response.data);
    })
    .catch(err => {
      let error;
      if (!err) 
      {
        res.status(500).send('Unexpected Error');
      }
      
      res.status(400).send(err.response.data.error_description); 
    });
})

module.exports = router;