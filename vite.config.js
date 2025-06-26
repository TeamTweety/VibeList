export default {
  server: {
    proxy: {
      '/search': 'http://localhost:3000',
    },
  },
};
