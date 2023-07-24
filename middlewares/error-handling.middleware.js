const errorHandlingMiddleware = (err, req, res, next) => {
    console.error('Error:', err.message);
    const message = err.message || "Server error";
    const statusCode = err.status || 500; // Используйте err.status вместо err.code
    console.log('Sending response with status code:', statusCode);
    res.status(statusCode).json({ message });
};

module.exports = {
    errorHandlingMiddleware,
};