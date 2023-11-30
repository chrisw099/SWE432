const mongoose = require('mongoose');
// define a schema that maps to the structure of the data in MongoDB
const timeslotSchema = new mongoose.Schema({
    //id: Number,
    Timeslot: String,
    Playlist: String,
    Dj : String
  });
 // now create model using this schema that maps to books collection in database
 module.exports = mongoose.model('Timeslot', timeslotSchema,'timeslots');