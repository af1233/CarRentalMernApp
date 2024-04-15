const AddCar = require('../models/carModel');
const cloudinary=require("cloudinary").v2;

// Controller to get all cars
async function getAllcars(req, res) {
  try {
    // Find cars where there are no booked time slots
    const availableCars =  await AddCar.find();
  console.log(availableCars)
    res.status(200).json(availableCars);
  } catch (error) {
    console.error('Error fetching available cars:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Controller to get all cars of single user 
async function getSignleUserCars(req, res) {
  try {
    const userData=req.user;
    const cars = await AddCar.find({owner:userData._id});
    console.log(cars)
    res.status(200).json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


// Controller to get a single car by ID
async function getSingleCar(req, res) {
  try {
    const { id } = req.params;
    const car = await AddCar.findById(id);
    
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    
    res.status(200).json(car);
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Controller to create a new car
async function createCar(req, res) {
  try {
    const userData=req.user;

    // Extracting car details from request body
    const { name, color, rent} = req.body;

    // Uploading image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Creating a new car instance with image URL from Cloudinary
    const newCar = new AddCar({
      owner: userData._id,
      name,
      color,
      rent,
      image: result.secure_url, // Storing the image URL from Cloudinary
    
    });

    // Saving the new car to the database
    const savedCar = await newCar.save();

    res.status(201).json({
      success: true,
      message: 'Car created successfully',
      car: savedCar
    });
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create car'
    });
  }
}
 
// // Controller to update a car
// async function updateCar(req, res) {
//   try {
//     const userData = req.user;
//     const carId = req.params.id; // Assuming the car ID is passed as a parameter

//     // Extracting updated car details from request body
//     const { name, color, rent } = req.body;

//     // Check if the car exists
//     const existingCar = await AddCar.findById(carId);
//     if (!existingCar) {
//       return res.status(404).json({
//         success: false,
//         message: 'Car not found'
//       });
//     }

//     // Check if the user is the owner of the car
//     if (existingCar.owner.toString() !== userData._id.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: 'Unauthorized access: You are not the owner of this car'
//       });
//     }

//     // Update car details
//     existingCar.name = name;
//     existingCar.color = color;
//     existingCar.rent = rent;

//     // Check if there's a new image uploaded
//     if (req.file) {
//       // Uploading new image to Cloudinary
//       const result = await cloudinary.uploader.upload(req.file.path);

//       // Update image URL
//       existingCar.image = result.secure_url;
//     }

//     // Save the updated car
//     const updatedCar = await existingCar.save();

//     res.status(200).json({
//       success: true,
//       message: 'Car updated successfully',
//       car: updatedCar
//     });
//   } catch (error) {
//     console.error('Error updating car:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update car'
//     });
//   }
// }
// // Controller to update a car
// async function updateCar(req, res) {
//   try {
//     const userData = req.user;
//     const carId = req.params.id; // Assuming the car ID is passed as a parameter

//     // Extracting updated car details from request body
//     const { name, color, rent } = req.body;

//     // Check if the car exists
//     const existingCar = await AddCar.findById(carId);
//     if (!existingCar) {
//       return res.status(404).json({
//         success: false,
//         message: 'Car not found'
//       });
//     }

//     // // Check if the user is the owner of the car
//     // if (!(existingCar.owner=== userData._id)) {
//     //   return res.status(403).json({
//     //     success: false,
//     //     message: 'Unauthorized access: You are not the owner of this car'
//     //   });
//     // }
//     //  existingCar.owner=userData._id;
//     // Update car details
//     existingCar.name = name;
//     existingCar.color = color;
//     existingCar.rent = rent;

//     // Check if there's a new image uploaded
//     if (req.file.path) {
//       // Uploading new image to Cloudinary
//       const result = await cloudinary.uploader.upload(req.file.path);

//       // Update image URL
//       existingCar.image = result.secure_url;
//     }

//     // Save the updated car
//     const updatedCar = await existingCar.save();

//     res.status(200).json({
//       success: true,
//       message: 'Car updated successfully',
//       car: updatedCar
//     });
//   } catch (error) {
//     console.error('Error updating car:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update car'
//     });
//   }
// }

 // Controller to update a car
async function updateCar(req, res) {
  try {
    const userData = req.user;
    const carId = req.params.id; // Assuming the car ID is passed as a parameter

    // Check if the car exists
    const existingCar = await AddCar.findById(carId);
    if (!existingCar) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    // Extracting updated car details from request body
    const { name, color, rent } = req.body;

    // Update only the fields that are provided in the request
    if (name) existingCar.name = name;
    if (color) existingCar.color = color;
    if (rent) existingCar.rent = rent;

    // Check if there's a new image uploaded
    if (req.file) {
      // Uploading new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      // Update image URL
      existingCar.image = result.secure_url;
    }

    // Save the updated car
    const updatedCar = await existingCar.save();

    res.status(200).json({
      success: true,
      message: 'Car updated successfully',
      car: updatedCar
    });
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update car'
    });
  }
}


// Controller to delete a car
async function deleteCar(req, res) {
  try {
    const { id } = req.params;

    // Check if the car exists
    const car = await AddCar.findById(id);
    if (!car) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    }

    // Delete the car from the database
    await car.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Car deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete car'
    });
  }
}

module.exports = {
  createCar,
  getSignleUserCars,
 updateCar,
  deleteCar,
  getAllcars,
  getSingleCar
};
