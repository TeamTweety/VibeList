// Imports
import express from 'express';
import 'dotenv/config';
import { createPlaylist, getSong, getToken, getUserID, newTest } from './controllers/spotifyController.js';
import { parseUserVibe } from './controllers/userVibeController.js';
import { queryOpenAI } from './controllers/openaiController.js';
import { logController } from './controllers/logController.js';

// Server setup
const PORT = 3000;
const app = express();

// Server chores
app.use(express.json());
app.use(express.static('./'));

// Main routes
app.post('/search', parseUserVibe, queryOpenAI, getToken, getSong, logController,(req, res) => {
  res.status(200).send(res.locals.searchResults);
});

app.post('/refreshPlaylist', parseUserVibe, queryOpenAI, getToken, getSong, logController,(req, res) => {
  res.status(200).send(res.locals.searchResults);
});

app.post('/refreshSong', parseUserVibe, queryOpenAI, getToken, getSong, logController,(req, res) => {
  res.status(200).send(res.locals.searchResults);
});

app.post('/test', getToken, newTest, (req, res) => {
  res.status(200).json({
    playlistURI: res.locals.playlistURI,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Initialize server
app.listen(PORT, () =>
  console.log('\n \n 🟢 Server is listening on port 3000\n \n ')
);

