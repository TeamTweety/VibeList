// Imports
import express from 'express';
import 'dotenv/config';
import { getSong, getToken } from './controllers/spotifyController.js';
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
<<<<<<< HEAD
app.post('/search', parseUserVibe, queryOpenAI, getToken, getSong, (req, res) => {
=======
app.post('/search', parseUserVibe, queryOpenAI, getToken, getSong, logController,(req, res) => {
>>>>>>> b949121b5d308f44afc3f268c486ac782a84269d
  res.status(200).send(res.locals.searchResults);
});

app.post('/refreshPlaylist', parseUserVibe, queryOpenAI, getToken, getSong, logController,(req, res) => {
  res.status(200).send(res.locals.searchResults);
});

app.post('/refreshSong', parseUserVibe, queryOpenAI, getToken, getSong, logController,(req, res) => {
  res.status(200).send(res.locals.searchResults);
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
