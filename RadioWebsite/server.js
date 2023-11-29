require('dotenv').config();
console.log(process.env.MONGO_URL);
const express = require('express');
const mongoose = require('mongoose');
var session = require('express-session');
var parseurl = require('parseurl');
const ejs = require('ejs');
const app = express();
app.use(express.urlencoded({extended: true}));


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

app.use(express.static(__dirname +'/static'));

app.set('view engine', 'ejs')
app.listen(8080);
console.log("Server is listening on port 8080 ");

mongoose.connect('mongodb://127.0.0.1:27017/radio', {useNewUrlParser: true,
           useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',  () => {
   console.log('connected to mongo');
});


//let Playlist = mongoose.model('Playlist', playlistSchema)

const Playlist = require('./models/Playlist.js')
const Song = require('./models/Song.js')
const Timeslot = require('./models/Timeslot.js')

app.get('/', async function(req, res){

    const plOpt = await Playlist.find({}, {Name: 1, Songs:1});
    const sOpt = await Song.find({}, {Title: 1});
    const tOpt = await Timeslot.find({}, {Timeslot:1, Playlist:1, Dj:1 })

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



  



