
const express = require('express');
const { 
    createUser,          // Controller function for user registration
    loginUser,           // Controller function for user login
    getAllUser,          // Controller function to get all users
    getaUser,            // Controller function to get a single user
    deleteUser,          // Controller function to delete a user
    updateUser,          // Controller function to update a user
    blockUser,           // Controller function to block a user
    unBlockUser,         // Controller function to unblock a user
    handleRefreshToken,  // Controller function to handle refresh tokens
    logout               // Controller function to handle user logout
} = require('../controller/userController');
const { authMiddleware, isAdmin } = require("../middlewares/authMiddlewar");
const router = express.Router();

// Register a new user
router.post("/register", createUser);

// Login user
router.post("/login", loginUser);

// Get all users (admin only)
router.get("/allUsers", getAllUser);

// Refresh token route
router.get("/refresh", handleRefreshToken);

// Logout user route
router.get("/logout", logout);

// Get a single user (admin only)
router.get("/:id", authMiddleware, isAdmin, getaUser);

// Delete a user (admin only)
router.delete("/:id", deleteUser);

// Update user profile
router.put("/edit-user", authMiddleware, updateUser);

// Block user (admin only)
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);

// Unblock user (admin only)
router.put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser);

module.exports = router;
