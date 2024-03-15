const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require('../config/jwtToken');
const validateMongoDbId = require("../utils/validateMongoDbId");
const { generateRefreshToken } = require("../config/refreshToken");


const createUser = asyncHandler(async(req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if(!findUser) {
        // Create a new user
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        throw new Error("User Already Exists! Please Login Instead.");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser && await findUser.isPasswordMatched(password)) {
        const refreshToken = await generateRefreshToken(findUser ?._id);
        const updateuser = await User. findByIdAndUpdate(
        findUser.id,
        {
            refreshToken: refreshToken,
        },
        { new: true }
        );
        res. cookie("refreshToken", refreshToken,{
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
        });
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

// Get all users
const getAllUser = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    } catch (error) {
        throw new Error(error);
    }
});

// Get a single user
const getaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        res.json({
            user
        });
    } catch (error) {
        throw new Error(error);
    }
});

// handle refresh Token 
const handleRefreshToken = asyncHandler(async (req, res) => {
    // Get the refresh token cookie from the request
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken);
});

// Update a user
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

// Delete a user
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



module.exports = { createUser, loginUser, getAllUser, getaUser, updateUser, deleteUser, blockUser, unBlockUser, handleRefreshToken };
