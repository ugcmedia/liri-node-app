const Spotify = require('node-spotify-api');
const Twitter = require('twitter');

const spotify = new Spotify({
  id: '53ab4accb30044e3b6b7490e15fe6359',
  secret: '8e717d0dd8404934af1ffe8374f14072'
});

const client = new Twitter({
  consumer_key: 'aQzlpFYsA2bRXrsogbjvTg',
  consumer_secret: 'Fm0FJjEMd2lYswNGt5kj2YTB2xghcfs5nycCXlc311w',
  access_token_key: '188956081-BSQrik0qPswRYrlpXVFbseOgh6LmThCmwsXf88Ja',
  access_token_secret: 'oQA1Ko9hRNqWkISnEWM1MttnkUXxTuE0z0uzYKaV1ko'
});

module.exports = {
  client,
  spotify
};
