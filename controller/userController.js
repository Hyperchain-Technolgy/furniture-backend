const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require('../config/jwtToken');
const validateMongoDbId = require("../utils/validateMongoDbId");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");

// Function to create a new user
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        // Create a new user if not already exists
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        throw new Error("User Already Exists! Please Login Instead.");
    }
});

// Function to log in a user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser && await findUser.isPasswordMatched(password)) {
        const refreshToken = await generateRefreshToken(findUser ?._id);
        // Update the user document with the refresh token
        const updateuser = await User.findByIdAndUpdate(
            findUser.id,
            { refreshToken: refreshToken },
            { new: true }
        );
        // Set the refresh token in the cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000, // 72 hours
        });
        // Send response with user details and access token
        res.json({
            id: findUser?.id,
            fullname: findUser?.firstname,
            email: findUser?.email,
            token: generateToken(findUser?._id)
        });
    } else {
        throw new Error("Invalid Email or Password");
    }
});

// Function to get all users
const getAllUser = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    } catch (error) {
        throw new Error(error);
    }
});

// Function to get a single user by ID
const getaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        res.json({ user });
    } catch (error) {
        throw new Error(error);
    }
});

// Function to handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) {
        throw new Error("No Refresh Token in Cookies");
    }
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
        throw new Error("No Refresh token present in db or not matched");
    }
    // Verify the refresh token
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.id) {
            throw new Error("There is something wrong with refresh token");
        }
        const accessToken = generateToken(user?._id)
        res.json(accessToken)
    });
});

// Function to handle user logout
const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) {
        return res.status(400).json({ message: "No Refresh Token in Cookies" });
    }
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
        return res.status(400).json({ message: "User not found or refresh token does not match" });
    }
    // Clear the refresh token in the database
    try {
        await User.findOneAndUpdate({ refreshToken }, { refreshToken: "" });
        // Clear the cookie
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.sendStatus(204); // No content
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Function to update a user
const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const updatedUser = await User.findByIdAndUpdate(_id, req.body, { new: true });
        if (!updatedUser) {
            throw new Error("User not found");
        }
        res.json({
            message: "User updated successfully",
            updatedUser
        });
    } catch (error) {
        throw new Error(error);
    }
});

// Function to delete a user
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            throw new Error("User not found");
        }
        res.json({
            message: "User deleted successfully",
            deletedUser
        });
    } catch (error) {
        throw new Error(error);
    }
});

// Function to block a user
const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        // Find the user by ID and update their status to blocked
        const blockedUser = await User.findByIdAndUpdate(id, { isBlocked: true }, { new: true });
        if (!blockedUser) {
            throw new Error("User not found");
        }
        res.json({
            message: "User blocked successfully",
            blockedUser
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Function to unblock a user
const unBlockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        // Find the user by ID and update their status to active
        const unBlockedUser = await User.findByIdAndUpdate(id, { isBlocked: false }, { new: true });
        if (!unBlockedUser) {
            throw new Error("User not found");
        }
        res.json({
            message: "User unblocked successfully",
            unBlockedUser
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = { 
    createUser, 
    loginUser, 
    getAllUser, 
    getaUser, 
    updateUser, 
    deleteUser, 
    blockUser, 
    unBlockUser, 
    handleRefreshToken, 
    logout 
};
