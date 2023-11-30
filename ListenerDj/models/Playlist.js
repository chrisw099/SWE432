const mongoose = require('mongoose');
// define a schema that maps to the structure of the data in MongoDB
const playlistSchema = new mongoose.Schema({
    //id: Number,
    Name: String,
    Songs : [{
        Title: String,
        Artist: String,
        AlbumName: String,
        ImagePath: String,
        Description: String,
        Length: String
      }]
  });
 // now create model using this schema that maps to books collection in database
 module.exports = mongoose.model('Playlist', playlistSchema,'playlists');