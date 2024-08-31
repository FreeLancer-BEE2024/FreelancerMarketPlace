// const express = require("express");
// const cors = require("cors");
// const pool = require("../db");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const app = express();
// app.use(cors())
// app.use(morgan("dev"));
// app.use(express.json()); // Middleware to parse JSON bodies

// const PORT = process.env.PORT || 3000;
// app.post("/register", async (req, res) => {
//   const { email, name, gender, password1, country, contact, budget} = req.body;

//   try {
//     // Hash password
//     const hashedPassword = await bcrypt.hash(password1, 10);
//     try {
//       // Insert user into database
//       const userResult = await pool.query(
//         `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING user_id`,
//         [email, hashedPassword]
//       );

//       const userId = userResult.rows[0].user_id;
//       res.status(201).json({ message: "Welcome onboard!" });
//     } catch (err) {
//       // Rollback transaction in case of error
//       await pool.query("ROLLBACK");
//       throw err;
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err.message);
//   }
// });
// app.get("/first", (req, res) =>{

//     data = 5

//     res.status(200).json({data})
// })

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


//myy



// const express = require('express');
// const cors = require('cors');
// const app = express();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// app.use(cors({ origin: 'http://127.0.0.1:5500' }));

// // Connect to your database (e.g., MongoDB, PostgreSQL)
// const db = require('./db');

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Signup endpoint
// app.post('/signup', async (req, res) => {
//   const { email, password, firstName, lastName } = req.body;

//   // Validate the input data
//   if (!email || !password || !firstName || !lastName) {
//     return res.status(400).send({ error: 'Invalid input data' });
//   }

//   // Hash the password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Create a new user account
//   const user = await db.createUser({
//     email,
//     password: hashedPassword,
//     firstName,
//     lastName,
//   });

//   // Generate a JWT token
//   const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
//     expiresIn: '1h',
//   });

//   // Send the token back to the client
//   res.send({ token });
// });

// // Login endpoint
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   // Validate the input data
//   if (!email || !password) {
//     return res.status(400).send({ error: 'Invalid input data' });
//   }

//   // Find the user account
//   const user = await db.getUserByEmail(email);

//   // Check the password
//   const isValidPassword = await bcrypt.compare(password, user.password);

//   if (!isValidPassword) {
//     return res.status(401).send({ error: 'Invalid password' });
//   }

//   // Generate a JWT token
//   const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
//     expiresIn: '1h',
//   });

//   // Send the token back to the client
//   res.send({ token });
// });

// // Protected endpoint (requires authentication)
// app.get('/protected', authenticate, (req, res) => {
//   res.send({ message: 'Hello, authenticated user!' });
// });

// // Authentication middleware
// function authenticate(req, res, next) 
// {

//   const token = req.header('Authorization');

//   if (!token) {
//     return res.status(401).send({ error: 'Unauthorized' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).send({ error: 'Invalid token' });
//   }
// }

// app.listen(3000, () => {
//   console.log('Server listening on port 3000');
// });





/////////////////////////////////////////
// server.js
// server.js
const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the User model
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:5500'],
  methods: ['POST']
}));
app.use(express.json());

app.post('/api/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validate the input data
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const user = new User({ firstName, lastName, email, password: hashedPassword });

    // Save the user to the database
    await user.save();

    // Return a success response with a token (optional)
    const token = 'some-random-token';
    res.json({ message: 'User created successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});