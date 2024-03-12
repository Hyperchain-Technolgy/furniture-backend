// userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// POST route for user registration
router.post('/register', UserController.register);

// POST route for user login
router.post('/login', UserController.login);

// GET route to retrieve user by ID
router.get('/:id', UserController.getUserById);

module.exports = router;
