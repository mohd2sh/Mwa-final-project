const mongoose = require('mongoose');
const user = require('./user');
const location = require('./location');

const Schema = mongoose.Schema;

const event = new Schema({
    name: String,
    eventType: String,
    managedBy: mongoose.mongo.ObjectId,
    participants: [user.schema],
    start: { type: Date, default: Date.now },
    location: location.schema
})


module.exports = mongoose.model('Event', event);