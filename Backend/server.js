/////////////////////////////////////////
// server.js
// server.js
const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const SECRET_KEY = process.env.SECRET_KEY;
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
app.use(cookieParser()); 




// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});





app.post('/api/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log(firstName, lastName, email, password);

    // Validate the input data
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Invalid input data' });
    }  
    const existingUser = await User.findOne({email});
    if(existingUser) {
      return res.status(400).jdon({message: 'User already exists'});
    }
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const user = new User({ firstName, lastName, email, password: hashedPassword });

    // Save the user to the database
    await user.save();

    // Return a success response with a token (optional)
    res.json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }  
});  


app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Retrieve user from database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }  

    // Compare passwords
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(401).json({ message: "Invalid password" }); // Return a JSON response with an error message
    }  

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, '9fde1b4f34c3d7347f3bfbda44f56a99621a9a18109fe76e16d2020ab45483a8', {
      expiresIn: "1h",
    });  
    res.cookie('jwtToken', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour in milliseconds
    
    res.status(200).json({ token, user_id: user._id });
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }})  


app.get("/api/login", async (req, res) => {
  const token = req.cookies.jwtToken;

  if (!token) {
    return res.status(401).send("No token provided");
  }  

  try {
    const decoded = jwt.verify(token, '9fde1b4f34c3d7347f3bfbda44f56a99621a9a18109fe76e16d2020ab45483a8');
    console.log("decoded", decoded);

    // Fetch user details from MongoDB based on decoded token
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }  

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }  
});  






// Define the Work schema
const workSchema = new mongoose.Schema({
  title: String,
  description: String,
  requirements: String,
  duration: String,
  budget: Number
});  

// Create a new work model
const Work = mongoose.model('Work', workSchema);

// Define the POST endpoint for creating a new work
app.post('/api/works', async (req, res) => {
  try {
    const { title, description, requirements, duration, budget } = req.body;

    // Validate the input data
    if (!title || !description || !requirements || !duration || !budget) {
      return res.status(400).json({ message: 'Invalid input data' });
    }  

    // Create a new work object
    const work = new Work({ title, description, requirements, duration, budget });

    // Save the work to the database
    await work.save();

    // Return a success response
    res.json({ message: 'Work created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating work' });
  }  
});  

// Define the GET endpoint for retrieving all works
app.get('/api/works', async (req, res) => {
  try {
    const works = await Work.find().exec();
    res.json(works);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving works' });
  }  
});  

// Define the GET endpoint for retrieving a single work by ID
app.get('/api/works/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const work = await Work.findById(id).exec();
    if (!work) {
      return res.status(404).json({ message: 'Work not found' });
    }  
    res.json(work);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving work' });
  }  
});  

// Define the PUT endpoint for updating a work
app.put('/api/works/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const work = await Work.findById(id).exec();
    if (!work) {
      return res.status(404).json({ message: 'Work not found' });
    }  
    const { title, description, requirements, duration, budget } = req.body;
    work.title = title;
    work.description = description;
    work.requirements = requirements;
    work.duration = duration;
    work.budget = budget;
    await work.save();
    res.json({ message: 'Work updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating work' });
  }  
});  

// Define the DELETE endpoint for deleting a work
app.delete('/api/works/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Work.findByIdAndRemove(id).exec();
    res.json({ message: 'Work deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting work' });
  }  
});  


const userReviewSchema = new mongoose.Schema({
  userId: { type: String }, // or { type: Number } if you want to accept numbers
  rating: Number,
  review: String
});

// Create a new user review model
const UserReview = mongoose.model('UserReview', userReviewSchema);

// Define the POST endpoint for creating a new user review
app.post('/api/reviews', async (req, res) => {
  try {
    const { userId, rating, review } = req.body;

    // Create a new review document
    const newReview = new UserReview({
      userId,
      rating,
      review
    });

    // Save the review document
    await newReview.save();

    res.status(201).json({ message: 'Review created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating review' });
  }
});