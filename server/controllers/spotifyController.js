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
  const userVibeQuery = res.locals.userVibeQuery || [];

  const searchResults = [];

  try {
    await Promise.all(
      userVibeQuery.map(async (el) => {
        const query = new URLSearchParams({
          q: `track:${el.track}, artist:${el.artist}`,
          type: 'track',
          limit: 1,
          include_external: 'audio',
        });

        const response = await fetch(
          `https://api.spotify.com/v1/search?${query}`,
          {
            method: 'GET',
            headers: {
              Authorization: `${spotifyToken.token_type} ${spotifyToken.access_token}`,
            },
          }
        );

        const data = await response.json();

        const item = data.tracks.items[0];
        if (item) {
          searchResults.push({
            track: el.track,
            artist: el.artist,
            spotifyID: item.id,
          });
        } else {
          console.warn(`No result found for: ${el.track} by ${el.artist}`);
        }
      })
    );

    res.locals.searchResults = searchResults;
    return next();
  } catch (err) {
    // console.error('Error in getSong middleware:', err);
    return next({
      log: `No result found for: ${el.track} by ${el.artist}`,
      status: 500,
      message: { err: `An error occurred - ${err}` },
    });
  }
}

export async function getUserID(req, res, next) {
  const { spotifyToken } = res.locals;

  const response = await fetch(`https://api.spotify.com/v1/me`, {
    method: 'GET',
    headers: {
      Authorization: `${spotifyToken.token_type} BQCCXALajea-6P-uRWyfwMn6cy56GTVUmRGkRXjleUtULklu-JxDOU120bfea5MQ3B0ebSn0bK2tbZOuPZuhr8H0mLf4o2H72rhWMyNuR4H5H7XSrQq__uIijQlwO01pSRQpsQXNZ18E4FgbFN1q1uVzUKlKPQpEsMwAVyTW9JmNYZ7NwgRWgJRkDievRXhP0n-2vMaAXyNXiV7bT_G8zI1iwzCQnsJVEuKW6Abx8o8UsJTg5-eAcend1tJooCUwYqnKTq6RbsPHgsB5gwM_wUppcl7iqlhv8w6ijCFGS144TLA-ub-3XP0tru3bGniEJmaIPzRuYOufhaWO77XijyTUI8gNK-96GZ3c93yEsr2V_pnNoshA`,
    },
  });

  const data = await response.json();

  
  console.log('token : ',spotifyToken)
  console.log('User ID data : ', data);
  return next()
}


export async function newTest(req, res, next) {
  const { spotifyToken } = res.locals;

  const response = await fetch(`https://api.spotify.com/v1/users/1166729216/playlists`, {
    method: 'POST',
    headers: {
      Authorization: `${spotifyToken.token_type} BQCCXALajea-6P-uRWyfwMn6cy56GTVUmRGkRXjleUtULklu-JxDOU120bfea5MQ3B0ebSn0bK2tbZOuPZuhr8H0mLf4o2H72rhWMyNuR4H5H7XSrQq__uIijQlwO01pSRQpsQXNZ18E4FgbFN1q1uVzUKlKPQpEsMwAVyTW9JmNYZ7NwgRWgJRkDievRXhP0n-2vMaAXyNXiV7bT_G8zI1iwzCQnsJVEuKW6Abx8o8UsJTg5-eAcend1tJooCUwYqnKTq6RbsPHgsB5gwM_wUppcl7iqlhv8w6ijCFGS144TLA-ub-3XP0tru3bGniEJmaIPzRuYOufhaWO77XijyTUI8gNK-96GZ3c93yEsr2V_pnNoshA`,
      "Content-Type": 'application/json',
    },
      body: JSON.stringify({
    "name": "Foo Playlist",
    "description": "New playlist description",
    "public": false
})
});

  const data = await response.json();

  
  console.log('token : ',spotifyToken)
  console.log('User ID data : ', data);
}


// curl --request POST \
//   --url https://api.spotify.com/v1/users/1166729216/playlists \
//   --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z' \
//   --header 'Content-Type: application/json' \
//   --data '{
//     "name": "New Playlist",
//     "description": "New playlist description",
//     "public": false
// }'





export async function createPlaylist(req, res,next){
  try {
    const currPlayList = req.body.currentPlaylist
    console.log(currPlayList)
    const playlistIDs = currPlayList.map(el => `spotify:track:${el.spotifyID}`)
    const stringIDs = `spotify:playlist:create?${playlistIDs.join(',')}`
    res.locals.playlistURI = stringIDs
    next()
  } catch (error) {
    console.log('ERROR', error)
  }
}



