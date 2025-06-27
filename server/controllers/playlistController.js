export function getPlaylist(req, res, next) {
  const list = [];

  req.body.currentPlaylist.forEach((el) => {
    list.push(el.spotifyID);
  });
  res.locals.playlistURI = JSON.stringify(list);
  return next();
}
