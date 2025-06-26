import 'dotenv/config';
import fetch from 'node-fetch';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

export async function getToken(req, res, next) {
  const authString = Buffer.from(`${client_id}:${client_secret}`).toString(
    'base64'
  );

  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${authString}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'client_credentials' }),
  })
    .then((response) => response.json())
    .then((data) => {
      res.locals.spotifyToken = data;
      next();
    });
}

export async function getSong(req, res, next) {
  const { spotifyToken } = res.locals;
  const userVibeQuery = [
    { track: 'Weightless', artist: 'Marconi Union' },
    { track: 'Sunset Lover', artist: 'Petit Biscuit' },
    { track: 'Holocene', artist: 'Bon Iver' },
  ];

  const searchResults = [];

  async function processArray(userVibeQuery) {
    await Promise.all(
      userVibeQuery.map(async (el) => {
        const query = new URLSearchParams({
          q: `track:${el.track}, artist:${el.artist}`,
          type: 'track',
          limit: 1,
          include_external: 'audio',
        });
       await fetch(`https://api.spotify.com/v1/search?${query}`, {
          method: 'GET',
          headers: {
            Authorization: `${spotifyToken.token_type} ${spotifyToken.access_token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {

            searchResults.push({
              track: el.track,
              artist: el.artist,
              spotifyID: data.tracks.items[0].id,
            });
          });
        })
      );
    }
    await processArray(userVibeQuery)
      console.log(searchResults)
      res.locals.searchResults = searchResults;
    next()
}
