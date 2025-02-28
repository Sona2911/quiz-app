const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Quiz = require('./models/Quiz.js')
dotenv.config();

// Sample questions data
const questions = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
    correctAnswer: 'Paris',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Venus', 'Mars', 'Jupiter'],
    correctAnswer: 'Mars',
  },
  {
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
    correctAnswer: 'Pacific',
  },
  {
    question: 'Who wrote "Romeo and Juliet"?',
    options: ['Shakespeare', 'Hemingway', 'Dickens', 'Austen'],
    correctAnswer: 'Shakespeare',
  },
  {
    question: 'What is the chemical symbol for water?',
    options: ['O2', 'H2O', 'CO2', 'NaCl'],
    correctAnswer: 'H2O',
  },
  {
    question: 'How many continents are there?',
    options: ['5', '6', '7', '8'],
    correctAnswer: '7',
  },
  {
    question: 'Which gas do plants absorb from the atmosphere?',
    options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
    correctAnswer: 'Carbon Dioxide',
  },
  {
    question: 'What is 9 + 10?',
    options: ['18', '19', '20', '21'],
    correctAnswer: '19',
  },
  {
    question: 'Who painted the Mona Lisa?',
    options: ['Van Gogh', 'Picasso', 'Da Vinci', 'Rembrandt'],
    correctAnswer: 'Da Vinci',
  },
  {
    question: 'Which animal is known as the King of the Jungle?',
    options: ['Tiger', 'Elephant', 'Lion', 'Giraffe'],
    correctAnswer: 'Lion',
  },
];

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Insert data into database
const seedQuestions = async () => {
  try {
    await Quiz.deleteMany(); // Clears existing data
    await Quiz.insertMany(questions); // Inserts new data
    console.log('Questions added successfully!');
    process.exit();
  } catch (error) {
    console.error('Error adding questions:', error);
    process.exit(1);
  }
};

seedQuestions();
