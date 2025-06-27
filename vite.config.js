export default {
  server: {
    proxy: {
      '/search': 'http://localhost:3000',
      '/refreshPlaylist': 'http://localhost:3000',
      '/refreshSong': 'http://localhost:3000',
      '/test': 'http://localhost:3000',
    },
  },
};
