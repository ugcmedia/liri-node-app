const {spotify, client} = require('./keys');
const fs = require('fs');
const axios = require('axios');

const action = process.argv[2];
const command = process.argv.slice(3).join('+');

function spot(song) {
  spotify
    .search({ type: 'track', query: song })
    .then((response) => {
      let arr = [];
      let log = '';
      response.tracks.items.forEach((item) => {
        let obj = `artist: ${item.album.artists[0].name}\nsong: ${item.name}\nurl: ${item.album.external_urls.spotify}\nalbum: ${item.album.name}`;
        let space = `\n_-_-_-_-_-_-_-_-_-_-_-_\n`;
        log += obj + space;
        arr.push(obj)
      });
      console.log(log);
      append(arr, `${action}:\n`)
    })
    .catch((err) => {
      console.log(err);
    })
}

function tweet() {
  let arr = [];
  client.get('favorites/list', function(error, tweets, response) {
    tweets.forEach((item) => {
      console.log(`Date: ${item.created_at}\nTweet: ${item.text}`);
      arr.push(`Date: ${item.created_at}\nTweet: ${item.text}`)
    });
    append(arr, `${action}:\n`);
  });
}

function imdb(movie) {
  let url = `http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=40e9cece`;
  let arr = [];
  axios.get(url).then((res) => {
    let data =
      `
Title: ${res.data.Title},
Year: ${res.data.Year},
Imdb Rating: ${res.data.Ratings[0] ? res.data.Ratings[0].Value : 'N/A'},
Rotten Tomatoes Rating: ${res.data.Ratings[1] ? res.data.Ratings[1].Value : 'N/A'},
Country: ${res.data.Country},
Language: ${res.data.Language},
Actors: ${[res.data.Actors.split(',')]}            
      `;
    console.log(data);
    arr.push(data);
    append(arr, `${action}:\n`)
  })
}

function append(arr, command) {
  let log = '';
  let space = `\n_-_-_-_-_-_-_-_-_-_-_-_\n`;
  arr.forEach((item) => {
    log += item;
  });
  fs.appendFile('log.txt',command + log + space, (err) => {
    if(err)
      return err
  })
}

function random() {
  fs.readFile('random.txt', 'utf8', (err, data) => {
    spot(data.split(',')[1])
  });
}

switch(action) {
  case 'my-tweets':
    tweet(); break;
  case 'spotify-this-song':
    spot(command); break;
  case 'movie-this':
    imdb(command); break;
  case 'do-what-it-says':
    random(); break;
  default:
    console.log("Sorry, that's not a command");
}
