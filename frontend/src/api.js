import axios from 'axios';

const API_URL =  'https://quiz-app-eirv.onrender.com';

export const fetchQuestions = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    throw error;
  }
};
