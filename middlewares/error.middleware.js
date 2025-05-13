const errorMiddleware = (err, req, res, next) => {
    try {
        let error = { ...err };
        error.message = err.message;
        console.error(error);

        // Mongoose Bad ObjectId
        if (error.name === "CastError") {
            const message = "Resource Not Found";
            error = new Error(message);
            error.statusCode = 404;
        }

        // Mongoose Duplicate Key
        if (error.code === 11000) {
            const message = "Duplicate field value entered";
            error = new Error(message);
            error.statusCode = 400;
        }

        // Mongoose Validation Error
        if (err.name === "ValidationError") {
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(', '));
            error.statusCode = 500;
        }

        res.status(error.statusCode || 500).json({ success: false, error: error.message || 'Server Error'});
    } catch (err) {
        next(err);
    }
};

export default errorMiddleware;