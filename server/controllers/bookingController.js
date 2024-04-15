 
const BookNow = require("../models/bookingModel");
const AddCar = require("../models/carModel");

// const CreateBookCar = async (req, res) => {
//   const {
//     startDate,
//     endDate,
//     username,
//     address,
//     email,
//     phone,
//     city,
//     totalAmount,
//   } = req.body;
//   const userData = req.user;
//   const { id } = req.params;

//   try {
//     // Find the car by ID
//     const findCar = await AddCar.findById(id);

//     // Check if the car exists
//     if (!findCar) {
//       return res.status(404).json({ error: "Car not found" });
//     }

//     // Create a new booking
//     const newBooking = new BookNow({
//       selectedCarId: findCar._id,
//       customerId: userData._id,
//       startDate,
//       endDate,
//       username,
//       address,
//       email,
//       phone,
//       city,
//       totalAmount,
//     });

//     // Save the new booking
//     await newBooking.save();

//     // Send success response
//     res.status(201).json({ message: "Booking created successfully", booking: newBooking });
//   } catch (error) {
//     // Handle errors
//     console.error("Error creating booking:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

const CreateBookCar = async (req, res) => {
  const {
    startDate,
    endDate,
    username,
    address,
    email,
    phone,
    city,
    totalAmount,
  } = req.body;
  const userData = req.user;
  const { id } = req.params;

  try {
    // Find the car by ID
    const findCar = await AddCar.findById(id);

    // Check if the car exists
    if (!findCar) {
      return res.status(404).json({ error: "Car not found" });
    }

    // Create a new booking
    const newBooking = new BookNow({
      selectedCarId: findCar._id,
      customerId: userData._id,
      startDate,
      endDate,
      username,
      address,
      email,
      phone,
      city,
      totalAmount,
    });

    // Save the new booking
    await newBooking.save();

    // Update the bookedTimeSlots of the car
    findCar.bookedTimeSlots.push({
      startDate,
      endDate,
    });
    findCar.isBooked = true;
    await findCar.save();

    // Send success response
    res
      .status(201)
      .json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    // Handle errors
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ...................customersown orders of booking its own rides.......
const getAllOrdersOfUser = async (req, res) => {
  const userData = req.user;
  try {
    const bookings = await BookNow.find({ customerId: userData._id });

    // Create an array to store car details for each booking
    const carDetails = [];

    // Loop through each booking to find the details of the selected car
    for (const booking of bookings) {
      const car = await AddCar.findById(booking.selectedCarId);
      console.log("Booking:", booking); // Log the booking object
      console.log("Car:", car); // Log the car object
      carDetails.push(car);
    }

    res.status(200).json({ bookings, carDetails }); // Send both bookings and carDetails
  } catch (error) {
    res.status(500).json(error);
  }
};

// .................get customer orders...............

const getAllCustomersOrders = async (req, res) => {
  const userData = req.user;
  try {
    // Query the AddCar collection to find cars owned by the specified owner
    const ownedCars = await AddCar.find({ owner: userData._id });

    // Extract car IDs from ownedCars
    const carIds = ownedCars.map((car) => car._id);

    // Query BookNow collection to find bookings related to the owned cars
    const allUsersBookings = await BookNow.find({ selectedCarId: { $in: carIds } }) 
// Create an array to store car details for each booking
const carDetails = [];

// Loop through each booking to find the details of the selected car
for (const booking of allUsersBookings) {
  const car = await AddCar.findById(booking.selectedCarId);
  console.log("Booking:", booking); // Log the booking object
  console.log("Car:", car); // Log the car object
  carDetails.push(car);
}


    // console.log(allUsersBookings);
    res.status(200).json({allUsersBookings, carDetails});
  } catch (error) {
    console.error("Error fetching car orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch car orders" });
  }
};


module.exports = { CreateBookCar, getAllOrdersOfUser, getAllCustomersOrders };
