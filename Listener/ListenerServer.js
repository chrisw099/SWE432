const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname +'/static'));
app.use(express.json())

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

const listenerPreferences = new mongoose.Schema({
  _id : String,
  uid: Number,
  Username: String,
  DisplayName: String,
  Email: String,
  LikedGenres: String,
  DislikedGenres: String
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

app.get('/ListenerSearch*', async function(req, res){
  let songs = mongoose.model('SongList', songSchema, 'SongList');
  let search = await req.query.search;
  let songlist = await songs.find({$or: [{'Artist': {$regex: new RegExp(search, 'i')}}, {'Title': {$regex: new RegExp(search, 'i')}}]});
  res.json(songlist);
  console.log(songlist);
});

app.get('/ListenerSettings', async function(req, res) {
  let songs = mongoose.model('SongList', songSchema, 'SongList');
  let search = await req.query.search;
  let songlist = await songs.find({$or: [{'Artist': {$regex: new RegExp(search, 'i')}}, {'Title': {$regex: new RegExp(search, 'i')}}]});
  let playingsong = songlist[6]

  let prefs = mongoose.model('ListenerPref', listenerPreferences, 'ListenerPref');
  let userprefs = await prefs.find()
  
  res.render('pages/ListenerSettings', {
    playingsong: playingsong,
    userprefs: userprefs
  });
});

app.post('/ListenerUpdate*', async function(req, res){
  console.log(req.body)
  let prefs = mongoose.model('ListenerPref', listenerPreferences, 'ListenerPref');
  let update = {}

  if(req.body.Username!=""){
    update.Username = req.body.Username
  }
  if(req.body.DisplayName!=""){
    update.DisplayName = req.body.DisplayName
  }
  if(req.body.Email!=""){
    update.Email = req.body.Email
  }
  if(req.body.LikedGenres!=""){
    update.LikedGenres = req.body.LikedGenres
  }
  if(req.body.DislikedGenres!=""){
    update.DislikedGenres = req.body.DislikedGenres
  }
  ud = await prefs.findOneAndUpdate({"uid": 1}, {
    $set: {update}
  });
  let userdata = await prefs.findOne();
  res.json(userdata);
  console.log("Server Updated, "+userdata)
})

console.log("DEBUG: Server listening in 8080")
app.listen(8080)