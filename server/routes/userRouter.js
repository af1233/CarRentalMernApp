const express=require("express");
const { registerUser, loginUser, user } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router=express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/user",authMiddleware, user)
module.exports=router