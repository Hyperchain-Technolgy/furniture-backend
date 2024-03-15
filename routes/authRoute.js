//authRoute
const express = require('express');
const { createUser, loginUser, getAllUser, getaUser, deleteUser, updateUser, blockUser, unBlockUser, handleRefreshToken } = require('../controller/userController');
const { authMiddleware, isAdmin } = require("../middlewares/authMiddlewar");
const router = express.Router();


router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/allUsers", getAllUser);
router.get("/refresh", handleRefreshToken);
router.get("/:id", authMiddleware,isAdmin, getaUser);
router.delete("/:id", deleteUser);
router.put("/edit-user", authMiddleware, updateUser)
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser)
router.put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser)



module.exports = router