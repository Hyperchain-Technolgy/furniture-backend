const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// Middleware to authenticate users
const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    // Check if the request contains an authorization header with a Bearer token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        try {
            // Verify the JWT token
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                // Fetch the user from the database using the decoded token data
                const user = await User.findById(decoded.id);
                if (!user) {
                    throw new Error("User not found");
                }
                // Attach the user to the request object for further processing
                req.user = user;
                next();
            }
        } catch (error) {
            console.error("Authentication Error:", error.message);
            // Handle authentication errors
            return res.status(401).json({ message: "Not Authorized: Token expired or invalid, Please Login again" });
        }
    } else {
        // Handle missing authorization header or token
        return res.status(401).json({ message: "Not Authorized: There is no token attached to the header" });
    }
});

// Middleware to check if the user is an admin
const isAdmin = asyncHandler(async (req, res, next) => {
    const { role } = req.user; // Assuming the role is stored in the user object
    if (role !== "admin") {
        throw new Error("You are not an admin");
    } else {
        next();
    }
});

module.exports = { authMiddleware, isAdmin };
