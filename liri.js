require("dotenv").config();
let fs = require("fs");
let Twitter = require("twitter");
var Spotify = require('node-spotify-api');
const keys = require('./keys.js');
var request = require('request');
var spotify = new Spotify({
    id: "adff316c443145c79e403733042f83f0" ,
    secret: "8f71e603017547adbe30e9ebf0cd0a5c",
  });
  
let client = new Twitter(keys.twitter);
let command = process.argv[2];
let song = process.argv[3];
let movie = process.argv[3];

// console.log(client);

switch (command) {
    case "my-tweets": {
        getTweets();
        break;
    };
    case "spotify-this-song": {
        if(song) {
            getSpotify(song)
        } else {
            getSpotify('Bananas');
        }
        break;
    }
    case "movie-this": {
        if(movie) {
            getMovie(movie);
        } else {
            getMovie('Titanic');
        }
        break;
    }
    case "do-what-it-says":
    doThing();
  break;

  default:
    console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
  break;

}
function getTweets () {
    var params = {screen_name: 'REdBull'}
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        console.log("______________START______________")
        console.log("RECENT TWEETS :")
        console.log(tweets[0].text);
        console.log(tweets[0].created_at);
        console.log("________________END________________")
      }
    })};

function getSpotify (song) {
    spotify
    .search({ type: 'track', query: song })
    .then(function(response) {
    console.log("______________START______________")
    Object.keys(response.tracks.items[1].artists)
    console.log("Artist: " + response.tracks.items[1].artists[0].name);
    console.log("Song Name: " + response.tracks.items[1].name)
    console.log("Song Preview: " + response.tracks.items[1].preview_url)
    Object.keys(response.tracks.items[1].artists[0])
    console.log("Artist and Album Link: " + response.tracks.items[1].artists[0].external_urls.spotify);
    console.log("_________________END_______________")
    })
    .catch(function(err) {
    console.log(err);
    });
};

function getMovie() {
    request("https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
       // console.log('error:', error); // Print the error if one occurred
       var body = JSON.parse(body);
       console.log("______________START______________")
       console.log("Title: " + body.Title);
       console.log("Release Year: " + body.Year);
       console.log("IMdB Rating: " + body.imdbRating);
       console.log("Country: " + body.Country);
       console.log("Language: " + body.Language);
       console.log("Plot: " + body.Plot);
       console.log("Actors: " + body.Actors);
       let tomato = Object.keys(body.Ratings);
       console.log("Rating from Rotten Tomatoes: " + body.Ratings[1].Value);
       console.log("Rotten Tomatoes URL: https://www.rottentomatoes.com/");
       console.log("________________END_________________")
});                                                 
};
function doThing(){
    fs.readFile('random.txt', "utf8", function(error, data){
      var txt = data.split(',');
        console.log(txt)
        let text =  txt[1];
      getSpotify(text);
    });
}