const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    name: String,
    date: Date
});

module.exports = mongoose.model('Note', noteSchema);