const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// Middleware to parse JSON requests and handle CORS
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Clear cached models — useful for preventing OverwriteModelError during dev
Object.keys(mongoose.models).forEach((model) => {
  delete mongoose.models[model];
  delete mongoose.modelSchemas[model];
});

// Quiz model
const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question is required'],
  },
  options: {
    type: [String],
    validate: [arrayLimit, 'Options array must have exactly 4 items'],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: [true, 'Correct answer is required'],
  },
});

function arrayLimit(val) {
  return val.length === 4;
}

const Quiz = mongoose.model('Quiz', quizSchema);

// POST route to add quiz questions
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

// GET route to fetch all quiz questions
app.get('/api/quiz', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Default route to check API status
app.get('/', (req, res) => {
  res.send('Quiz API is running...');
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
