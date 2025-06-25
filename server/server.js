// Imports
import express from 'express';
import 'dotenv/config';

// Server setup
const PORT = 3000;
const app = express();

// Server chores
app.use(express.json());
app.use(express.static('./'));

// Main routes
app.post('/search', (req, res) => {
  res.status(200).send('/search route has been reached');
});

app.post('/refreshPlaylist', (req, res) => {
  res.status(200).send('/refreshPlaylist route has been reached');
});

app.post('/refreshSong', (req, res) => {
  res.status(200).send('/refreshSong route has been reached');
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
