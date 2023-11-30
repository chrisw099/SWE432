const mongoose = require('mongoose');
// define a schema that maps to the structure of the data in MongoDB
const radioDataSchema = new mongoose.Schema({
    {
    playlists:[
        {
            name: String,
            songs: [
                {name: String}
            ]
        }
    ]
},

{
    timeslots:[
        {
            name: String,
            playlist: String,
            dj: String
        }
    ]
},
  });
 // now create model using this schema that maps to books collection in database
 module.exports = mongoose.model('RadioData', radioDataSchema,'radioDatas');