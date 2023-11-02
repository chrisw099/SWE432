var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname +'/static'));


app.get('/Listener', function(req, res) {
    var songsl = [
    {"Title": "What a Wonderful World","Artist": "Louis Armstrong","AlbumName": "","ImagePath": "Louis_Armstrong_What_a_Wonderful_World.jpg","Description": ""},
    {"Title": "Giant Steps","Artist": "John Coltrane","AlbumName": "Giant Steps","ImagePath": "Coltrane_Giant_Steps.jpg","Description": ""},
    {"Title": "Fly Me to The Moon","Artist": "Frank Sinatra","AlbumName": "Giant Steps","ImagePath": "qe9o9pdvuu49b_600.jpg","Description": ""},
    {"Title": "'Round Midnight","Artist": "Thelonious Monk","AlbumName": "","ImagePath": "round-midnight.jpg","Description": ""},
    {"Title": "All Blue","Artist": "Miles Davis","AlbumName": "Kind of Blue","ImagePath": "10-KINDOFBLUE.jpg","Description": ""},
    {"Title": "A Night in Tunisia","Artist": "Dizzy Gillespie","AlbumName": "","ImagePath": "maxresdefault.jpg","Description": ""},
    {"Title": "Goodbye Pork Pie Hat","Artist": "Charles Mingus","AlbumName": "Mingus Mingus Mingus Mingus Mingus","ImagePath": "Charles_Mingus_Mingus_Mingus_Mingus_Mingus_Mingus.jpg","Description": "" },
    {"Title": "Stolen Moments","Artist": "Oliver Nelson","AlbumName": "The Blues and the Abstract Truth","ImagePath": "The_Blues_and_the_Abstract_Truth_(Oliver_Nelson_album_-_cover_art).jpg","Description": ""},
    {"Title": "Cantaloupe Island","Artist": "Herbie Hancock","AlbumName": "Empyrean Isles","ImagePath": "Empisle_hancock.jpg","Description": ""},
    {"Title": "Song For My Father","Artist": "Horace Silver","AlbumName": "Song For My Father","ImagePath": "Song_for_My_Father_(Horace_Silver_album_-_cover_art).jpg","Description": ""}]
    var playingsong = songsl[6]
  
    res.render('pages/ListenerHome', {
      songsl: songsl,
      playingsong: playingsong
    });
  });


  app.get('/ListenerSettings', function(req, res) {
    var songs = JSON.stringify([
    {"Title": "What a Wonderful World","Artist": "Louis Armstrong","AlbumName": "","ImagePath": "Louis_Armstrong_What_a_Wonderful_World.jpg","Description": ""},
    {"Title": "Giant Steps","Artist": "John Coltrane","AlbumName": "Giant Steps","ImagePath": "Coltrane_Giant_Steps.jpg","Description": ""},
    {"Title": "Fly Me to The Moon","Artist": "Frank Sinatra","AlbumName": "Giant Steps","ImagePath": "Coltrane_Giant_Steps.jpg","Description": ""},
    {"Title": "'Round Midnight","Artist": "Thelonious Monk","AlbumName": "","ImagePath": "round-midnight.jpg","Description": ""},
    {"Title": "All Blue","Artist": "Miles Davis","AlbumName": "Kind of Blue","ImagePath": "10-KINDOFBLUE.jpg","Description": ""},
    {"Title": "A Night in Tunisia","Artist": "Dizzy Gillespie","AlbumName": "","ImagePath": "maxresdefault.jpg","Description": ""},
    {"Title": "Goodbye Pork Pie Hat","Artist": "Charles Mingus","AlbumName": "Mingus Mingus Mingus Mingus Mingus","ImagePath": "Charles_Mingus_Mingus_Mingus_Mingus_Mingus_Mingus.jpg","Description": "" },
    {"Title": "Stolen Moments","Artist": "Oliver Nelson","AlbumName": "The Blues and the Abstract Truth","ImagePath": "The_Blues_and_the_Abstract_Truth_(Oliver_Nelson_album_-_cover_art).jpg","Description": ""},
    {"Title": "Cantaloupe Island","Artist": "Herbie Hancock","AlbumName": "Empyrean Isles","ImagePath": "Empisle_hancock.jpg","Description": ""},
    {"Title": "Song For My Father","Artist": "Horace Silver","AlbumName": "Song For My Father","ImagePath": "Song_for_My_Father_(Horace_Silver_album_-_cover_art).jpg","Description": ""}])
    var playingsong = songs[6]
  
    res.render('pages/ListenerSettings', {
      playingsong: playingsong
    });
  });

app.listen(8080)