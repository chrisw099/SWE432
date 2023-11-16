require('dotenv').config();
console.log(process.env.MONGO_URL);
const express = require('express');
const mongoose = require('mongoose');
var session = require('express-session');
var parseurl = require('parseurl');
const ejs = require('ejs');
const app = express();


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

mongoose.connect('mongodb://127.0.0.1:27017/test', {useNewUrlParser: true,
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

    const plOpt = await Playlist.find({}, {name: 1, songs:1});
    const sOpt = await Song.find({}, {name: 1});
    const tOpt = await Timeslot.find({}, {timeslot:1, playlist:1, dj:1 })

   console.log('you viewed this page ' + req.session.views['/'] + ' times')

    res.render('pages/djPage', {
        plOptions: plOpt,
        sOption : sOpt,
        tOption : tOpt

    });

   
});




  



