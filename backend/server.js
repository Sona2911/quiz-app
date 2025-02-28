const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({ origin: '*' })); 
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Clear cached models to prevent OverwriteModelError during dev
Object.keys(mongoose.models).forEach((model) => {
  delete mongoose.models[model];
  delete mongoose.modelSchemas[model];
});

// Quiz Schema
const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question is required'],
  },
  options: {
    type: [String],
    validate: [(val) => val.length === 4, 'Options array must have exactly 4 items'],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: [true, 'Correct answer is required'],
  },
});

const Quiz = mongoose.model('Quiz', quizSchema);

// Routes
app.get('/api/quiz', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/quiz', async (req, res) => {
  try {
    const quizData = req.body;
    if (!Array.isArray(quizData) || quizData.length === 0) {
      return res.status(400).json({ error: 'Please provide an array of quiz questions' });
    }
    const newQuiz = await Quiz.insertMany(quizData);
    res.status(201).json({ message: 'Quiz questions added successfully', data: newQuiz });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health Check Route
app.get('/', (req, res) => {
  res.send('Quiz API is running...');
});

// Server Listening for Vercel
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app; // Export for Vercel