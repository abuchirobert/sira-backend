class CustomError extends Error { 

    status 
    statusCode 

    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith('4') ? false : false
        Error.captureStackTrace(this, this.constructor)
    }
}