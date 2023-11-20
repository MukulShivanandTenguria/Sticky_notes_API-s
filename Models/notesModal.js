const mongoose = require('mongoose');

const NoteSchema =new mongoose.Schema({
    title:{
        type:String,
        required: [true, "Please enter your email"],
        unique:true,
        
    },
    description:{
        type:String,
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:[true,"Review must belong to a tour."],
        index:true,
        unique:true
    },
    asd:{
        type:String,
        unique:true
    }
})
const Notes = mongoose.model('note', NoteSchema);

module.exports = Notes