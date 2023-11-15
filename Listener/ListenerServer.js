const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname +'/static'));

mongoose.connect('mongodb://127.0.0.1:27017/swe432');
const db = mongoose.connection;

const songSchema = new mongoose.Schema({
  _id: String,
  Title: String,
  Artist: String,
  AlbumName: String,
  ImagePath: String,
  Description: String
});


db.once('open', () => {
    console.log('DEBUG: Mongo session has been connected');
});

app.get('/Listener', async function(req, res) {
  let songs = mongoose.model('SongList', songSchema, 'SongList');
  let songslist = await songs.find();
  let playingsong = songslist[6];
  
  res.render('pages/ListenerHome', {
    songsl: songslist,
    playingsong: playingsong
  });
});


app.get('/ListenerSettings', function(req, res) {
  var songs = []
  var playingsong = songs[6]
  
  res.render('pages/ListenerSettings', {
    playingsong: playingsong
  });
});

console.log("DEBUG: Server listening in 8080")
app.listen(8080)