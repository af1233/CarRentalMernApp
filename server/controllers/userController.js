const User = require("../models/userModel"); // Adjust the path as needed
const jwt = require("jsonwebtoken");
// Controller to handle user registration
async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }
    // Create a new user
    const newUser = new User({ name, email, password });
    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Controller to handle user login
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    // User is authenticated, generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2d" }
    );

    res.status(200).json({token});
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const user = async (req, res) => {
  try {
    // const userData = await User.find({});
    const userData = req.user;
     
    console.log(userData);
    return res.status(200).json({userData});
  } catch (error) {
    console.log(` error from user route ${error}`);
  }
};

module.exports = {
  registerUser,
  loginUser,
  user,
};
