// Import axios
import axios from 'axios';

// Get the API URL from the environment variable
const apiUrl = process.env.VUE_APP_API_URL;

// Function to hit the API
async function hitApi(data) {
  try {
    const response = await axios.post(`${apiUrl}/piutang`, data);
    // Handle the response as needed
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Error hitting API:', error);
    throw error;
  }
}

export { hitApi };