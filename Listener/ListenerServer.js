const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname +'/static'));
app.use(express.json())

app.use(express.urlencoded({extended: true}));
var session = require('express-session');
var parseurl = require('parseurl');

app.set('trust proxy', 1)
app.use(session({
    secret : 'View Counter',
    resave : false,
    saveUninitialized: true,
}))

app.use(function(req, res, next){
    if(!req.session.views){
        req.session.views={}
    }
    
    var pathname = parseurl(req).pathname
    
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1

    next()
})

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

//timeslot for producer
const timeslotSchema = new mongoose.Schema({
  timeslot: String,
  dj: String,
  playlist: String,
  songs: [songSchema]
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

//Producer part
const constTimeslots = [
  { time: '9:00 AM - 10:00 AM' },
  { time: '10:00 AM - 11:00 AM' },
  { time: '11:00 AM - 12:00 PM' },
  { time: '12:00 PM - 1:00 PM' },
  { time: '1:00 PM - 2:00 PM' },
  { time: '2:00 PM - 3:00 PM' },
  { time: '3:00 PM - 4:00 PM' },
  { time: '4:00 PM - 5:00 PM' },
  { time: '5:00 PM - 6:00 PM' },
  { time: '6:00 PM - 7:00 PM' },
  { time: '7:00 PM - 8:00 PM' },
  { time: '8:00 PM - 9:00 PM' },
  { time: '9:00 PM - 10:00 PM' },
];

const Songs = mongoose.model('SongList', songSchema, 'SongList');
const PlaylistP = mongoose.model('PlaylistP', timeslotSchema, 'Playlist');

// producer page
app.get('/Producer', async function(req, res) {
  let songslist = await Songs.find();
  let playlistDB = await PlaylistP.find();

  res.render('pages/Producer', { 
    DBsongs: songslist, 
    timeslots: constTimeslots,
    playlist : playlistDB
   });
});

// producer add songs
app.post('/addSong', async (req, res) => {
  const selectedSongTitle = req.body.selectedSong;
  const formTimeslot = req.body.selectedTimeslot;

  const selectedSong = await Songs.findOne({title: selectedSongTitle});
  if (!selectedSong) {
    return res.status(404).json({ error: 'Selected song not found' });
  }

  const playlist = await PlaylistP.findOne({timeslot: formTimeslot});
  if (!playlist) {
    return res.status(404).json({error: 'Playlist not found'});
  }

  playlist.songs.push(selectedSong);
  await playlist.save();

  res.redirect('/');
});

const Playlist = require('./models/Playlist.js')
const Song = require('./models/Song.js')
const Timeslot = require('./models/Timeslot.js')

app.get('/dj', async function(req, res){

  const plOpt = await Playlist.find({}, {Name: 1, Songs:1});
  const sOpt = await Song.find({}, {Title: 1});
  const tOpt = await Timeslot.find({}, {Timeslot:1, Playlist:1, Dj:1 })

  console.log("plopt:" + plOpt);

 console.log('you viewed this page ' + req.session.views['/'] + ' times')

  res.render('pages/djPage', {
      plOptions: plOpt,
      sOption : sOpt,
      tOption : tOpt

  });


});

app.post('/plUpdate', async function(req, res){

  const timeSlot = req.body.tSlots
  const song = req.body.songs

  const cPList = await Timeslot.findOne({Timeslot: timeSlot}, {Playlist:1})

  console.log("Playlist: " + cPList);

  var newSong = await Song.findOne({"Title" : song},{});//{name: song};

  console.log("New Song :" + newSong);

  var updateLog = await db.collection("playlists").findOneAndUpdate({'Name' : cPList.Playlist}, {$push : {Songs: newSong}});

  console.log ("Song is "+ song);
  console.log("Timeslot is " + timeSlot);
  console.log("Playlist is "+ cPList);
  console.log("UpdateLog : " + updateLog)

  const plOpt = await Playlist.find({}, {Name: 1, Songs:1});
  const sOpt = await Song.find({}, {Title: 1});
  const tOpt = await Timeslot.find({}, {Timeslot:1, Playlist:1, Dj:1 })

  res.render('pages/djPage', {
      plOptions: plOpt,
      sOption : sOpt,
      tOption : tOpt

  });
});

app.get('/filterSongs', async function(req,res){

  const Playlist = require('./models/Playlist.js')
  let search =  req.query.search;

  //console.log("Search : " + search);

  let songList = await Playlist.findOne({'Name' : search},{Songs:1});

  //console.log("result: " + songList);

  res.json(songList);
});

app.get('/tsLookup', async function(req,res){

  const Playlist = require('./models/Timeslot.js')
  let search =  req.query.search;

  //console.log("Search : " + search);

  let tsList = await Timeslot.findOne({'Timeslot' : search},{Timeslot: 1, Dj: 1, Playlist:1});

  //console.log(tsList)

  res.json(tsList);
});




console.log("DEBUG: Server listening in 8080")
app.listen(8080)