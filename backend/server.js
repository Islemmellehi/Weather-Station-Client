// server.js (or app.js)
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb'); // Import MongoDB client
const authRoutes = require('../backend/routes/authRoutes'); // Adjust the path as needed

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

// MongoDB Connection
const mongoUrl = process.env.MONGO_URL || 'mongodb+srv://mhameddahmen0:dahmen123ess@cluster0.0qmet.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(mongoUrl);

// Routes
app.use('/api/auth', authRoutes); // Register auth routes

// Fetch data from MongoDB
app.get('/api/data', async (req, res) => {
  try {
    await client.connect(); // Connect to MongoDB
    const db = client.db('test'); // Replace with your database name
    const collection = db.collection('temperaturehumidities'); // Replace with your collection name

    const result = await collection.find({}).sort({ _id: -1 }).limit(10).toArray(); // Fetch latest 10 records
    res.status(200).json(result); // Send data as JSON response
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ error: 'Failed to fetch data' }); // Handle errors
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
