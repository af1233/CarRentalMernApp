// server.js
const dotenv=require("dotenv");
dotenv.config();
const express = require('express');
const db = require('./db');
const userRouter = require("./routes/userRouter");
const cors =require("cors");
const addcarRouter = require("./routes/addcarRouter");
const carbookingRouter=require("./routes/bookingRouter")
const app = express();
app.use(cors())
// Middleware
app.use(express.json());

// Routes
// app.get('/', (req, res) => {
//   res.send('Welcome to the Car Rental Application API');
// });
app.use("/api/v1", userRouter);
app.use("/api/v1", addcarRouter);
app.use("/api/v1", carbookingRouter);

db;
const port=process.env.PORT || 8080
// Start server
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
