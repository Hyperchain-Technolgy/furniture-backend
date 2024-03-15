// errorHandler.js

// Middleware for handling 404 Not Found errors
const notFound = (req, res, next) => {
    // Create a new Error instance with a 404 status and message
    const error = new Error(`Not Found : ${req.originalUrl}`);
    res.status(404); // Set response status to 404
    next(error); // Pass the error to the next middleware
}

// Middleware for handling all other errors
const errorHandler = (err, req, res, next) => {
    // Determine the status code based on the existing response status
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statusCode); // Set response status to the determined status code
    res.json({
        message: err?.message, // Send the error message in the response
        stack: err?.stack // Send the error stack trace in the response
    });
};

// Export the middleware functions
module.exports = { notFound, errorHandler };
