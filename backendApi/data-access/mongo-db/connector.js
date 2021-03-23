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
    console.log(input)
    note.save();
    return input;
};

const deleteNote = input => {
    return Note.findByIdAndRemove(input._id, function (err, res) {
        if (err) {
            console.log(err);
        }
        if (res) {
            return { message: "Success" };
        } else {
            return { message: "Not able to update data." };
        }
    });
}
module.exports = {
    getNotes,
    getNote,
    createNote,
    deleteNote,
};