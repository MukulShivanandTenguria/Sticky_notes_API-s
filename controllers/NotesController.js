const Notes = require('../Models/notesModal')
const APIFearure = require("../utils/APIFeatures")
const nodemailer = require("nodemailer");
const catchAsync = require("./../utils/catchAsync");
const AppError = require('../utils/appError');

exports.getAllNotes = catchAsync(async (req, res, next) => {
     // const notes = await Notes.find().sort("title");
        // const notes = await Notes.find();
        const query = new APIFearure(Notes.find(), req.query)
            .sort()
            .paginate()
        // .limitfield()
        const notes = await query.query
        if(!notes){
            return next(new AppError("No Notes Found", 404))
        }
        res.status(200).json({
            status: "success",
            results: notes.length,
            data: {
                data: notes
            }
        })
})

exports.createNote = catchAsync(async (req, res, next) => {
        const newNote = await Notes.create(req.body);
        res.status(200).json({
            status: "success",
            data: {
                note: newNote
            }
        })
})
exports.getNotesOFaUser = catchAsync(async (req, res, next) => {
        const notes = await Notes.find({ user: req.user._id });
        if(!notes){
            return next(new AppError("No note found",404))
        }
        res.status(200).json({
            status: "success",
            data: {
                note: { notes }
            }
        })
})

exports.getNoteById = catchAsync(async (req, res, next) => {
        const note = await Notes.findById(req.params.id)
        if(!note){
            return next(new AppError("No note found with this id",404))
        }
        res.status(200).json({
            status: "success",
            data: {
                data: note
            }
        })
})

exports.deleteNote = catchAsync(async (req, res, next) => {
        const note = await Notes.findByIdAndDelete(req.params.id)
        if(!note){
            return next(new AppError("No note found with this id",404))
        }
        res.status(204).json({
            status: "success",
            data: null
        })
})

exports.updateNote = catchAsync(async (req, res, next) => {
        const note = await Notes.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if(!note){
            return next(new AppError("No note found with this id",404))
        }
        res.status(200).json({
            status: "success",
            data: {
                data: note
            }
        })
})

exports.sendEmail = async (req, res, next) => {
    // let testAccount = nodemailer.createTestAccount()
    try {
    const transporter = nodemailer.createTransport({
        host: 'gmail',
        // port: 587,
        auth: {
            user: 'du3172578@gmail.com',
            pass: 'ddbrvzyegpdxjrny',

        }
    });
    let info =await transporter.sendMail({
        from:'"Mukul Tenguria" <du3172578@gmail.com>',
        to:'mukultenguria8@gmail.com',
        subject:'My first email',
        text:"hello Mukul Congratulations you created your first email API",
        html:"<b>This is HTML</b>"
    })
    console.log("asdfasdfasdf",info.messageId);
    res.json(info)
} catch (error) {
    res.json({
        error
    })

}
}