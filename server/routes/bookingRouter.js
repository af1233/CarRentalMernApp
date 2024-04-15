const express=require("express");
 
const authMiddleware = require("../middleware/authMiddleware");
const { CreateBookCar, getAllOrdersOfUser, getAllCustomersOrders } = require("../controllers/bookingController");
 
const router=express.Router();
 
router.post("/create-bookcar/:id", authMiddleware,CreateBookCar)
router.get("/getAllUserBookings", authMiddleware,getAllOrdersOfUser)
router.get("/getOwnerCarOrders",authMiddleware, getAllCustomersOrders)
module.exports=router