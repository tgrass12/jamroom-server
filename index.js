require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const spotifyRoutes = require('./routes/spotify');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/spotify', spotifyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
})