const mongoose = require('mongoose');
const attachment = require('./attachment');

const Schema = mongoose.Schema;

const location = new Schema({
    name: String,
    location: [Number],
    image: attachment.schema,
    website: String,
    supportedEvents: [String]
})

//Create index on location to use $near later on.
location.index({ location: '2dsphere' });
module.exports = mongoose.model('Location', location);