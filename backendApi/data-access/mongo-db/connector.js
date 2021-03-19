const Note = require('./models/notes');

const getNotes = () => {
    return Note.find();
};

const getNote = input => {
    var ObjectId = require('mongoose').Types.ObjectId;
    input._id = ObjectId(input._id);
    return Note.find(input).then((res) => {
        if (res) {
            return res[0];
        } else {
            return { name: "", date: "", message: "Record not found" };
        }
    });
};

const createNote = input => {
    input.date = new Date();
    let note = new Note(input);
    note.save();
    return input;
};

module.exports = {
    getNotes,
    getNote,
    createNote
};