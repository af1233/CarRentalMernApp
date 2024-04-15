// Import necessary modules
const mongoose = require("mongoose");

// Define schema for BookNow data
const bookNowSchema = new mongoose.Schema({
  selectedCarId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AddCar",
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
});

// Create model using the schema
const BookNow = mongoose.model("BookNow", bookNowSchema);

// Export the model
module.exports = BookNow;
