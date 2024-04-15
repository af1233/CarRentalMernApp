const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the addcar schema
const addcarSchema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
   isBooked: {
   type:Boolean,
   required:true,
   default:false
    },
    // Define availability for each car
    bookedTimeSlots: [
      {
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// Create and export the AddCar model
const AddCar = mongoose.model("AddCar", addcarSchema);
module.exports = AddCar;
