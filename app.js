const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/errorController')
const app = express()

const NotesRoutes = require('./routes/NotesRoute')
const userRoutes = require('./routes/userRoutes');
const AppError = require('./utils/appError');

app.use(express.json())
app.use(cookieParser());
app.use(cors());
// if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
// }
app.use((req, res, next) => {
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwtsds', "token", cookieOptions);
    // res.cookie("coocoo",)
    console.log("Hello from the middleware");
    next();

})

app.use('/notes', NotesRoutes)
app.use('/users', userRoutes)
app.all("*",(req,res,next)=>{
    // res.status(404).json({
    //     status:'fail',
    //     message:`Can't find ${req.originalUrl} on this server!`
    // })
    // const err = new Error(`Can't find ${req.originalUrl} on this server`);
    // err.status = 'fail';
    // err.statusCode = 404  
    // next(err)  
    next(new AppError(`Can't find ${req.originalUrl} on this server`,404))  
})
app.use(globalErrorHandler)
module.exports = app;