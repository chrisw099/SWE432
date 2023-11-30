const mongoose = require('mongoose');
// define a schema that maps to the structure of the data in MongoDB
const songSchema = new mongoose.Schema({
  _id: String,
  Title: String,
  Artist: String,
  AlbumName: String,
  ImagePath: String,
  Description: String,
  Length: String
});
 // now create model using this schema that maps to books collection in database
 module.exports = mongoose.model('SongList', songSchema,'SongList');