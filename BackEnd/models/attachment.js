const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attachment = new Schema({
    fileName: String,
    fileUrl: String,
})

module.exports = mongoose.model('Attachment', attachment);