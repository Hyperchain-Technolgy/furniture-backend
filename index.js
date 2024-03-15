const express = require('express');
const dbConnect = require('./config/dbconnect'); // Import database connection function
const app = express();
const dotenv = require('dotenv').config(); // Load environment variables
const PORT = process.env.PORT || 4000; // Define port number
const authRouter = require('./routes/authRoute'); // Import authentication router
const bodyParser = require('body-parser'); // Parse request bodies
const cookieParser = require('cookie-parser'); // Parse cookies
const { notFound, errorHandler } = require('./middlewares/errorHandler'); // Import error handling middleware

// Connect to the database
dbConnect();

// Middleware to parse cookies
app.use(cookieParser());
// Middleware to parse JSON bodies
app.use(bodyParser.json());
// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Route handling for authentication endpoints
app.use("/api/user", authRouter);

// Middleware for handling 404 Not Found errors
app.use(notFound);
// Middleware for handling other errors
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});
