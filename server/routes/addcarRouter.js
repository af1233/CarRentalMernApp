const express=require("express");
const { createCar, updateCar, deleteCar,getSignleUserCars, getAllcars, getSingleCar } = require("../controllers/addcarController");
const { uploadImage } = require("../utils/clodinaryconfig");
const authMiddleware = require("../middleware/authMiddleware");
 
const router=express.Router();
router.get('/getAllcars', getAllcars)
router.get("/getSignleUserCars",authMiddleware, getSignleUserCars);
router.get('/getCar/:id', getSingleCar);
router.post('/create-car',uploadImage,authMiddleware, createCar);
router.put('/update-car/:id',uploadImage, updateCar);
router.delete('/delete-car/:id', deleteCar);

module.exports=router