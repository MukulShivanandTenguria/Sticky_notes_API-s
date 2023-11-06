const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String,
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:[true,"Review must belong to a tour."],
        index:true
    }
})
const Notes = mongoose.model('note', NoteSchema);

module.exports = Notes