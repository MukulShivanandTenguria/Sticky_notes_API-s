const sendrErrorDev = (err, res) => {
    // Operational truster error: send message to client
    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        })
        // Programming or other unknown error: don't leak error details
    }else{
        // 1)Log error
        console.error("ERROR", err)
        res.status(500).json({
           status:'error',
           message:"SOmething went wrong!"
        })
    }
}
const sendrErrorProd = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    })
}
module.exports = (err, req, res, next) => {
    // console.log(err.stack);
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if (process.env.NODE_ENV !== 'development') {
        sendrErrorDev(err, res)
    } else if (process.env.NODE_ENV !== 'production') {
        sendrErrorProd(err, res)
    }
}