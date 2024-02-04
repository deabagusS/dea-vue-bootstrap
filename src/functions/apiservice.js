// Import axios
import axios from 'axios';

// Get the API URL from the environment variable
const apiUrl = process.env.VUE_APP_API_URL;

// Function to hit the API
async function hitApi(data, url) {
  try {
    const response = await axios.post(`${apiUrl}/${url}`, data);
    // Handle the response as needed
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Error hitting API:', error);
    throw error;
  }
}

async function downloadCsv(data, url) {
  axios.post(`${apiUrl}/${url}`, data, {
      responseType: 'blob',
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => {
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');

      let currentDateTime = new Date();
      let year = currentDateTime.getFullYear();
      let month = ('0' + (currentDateTime.getMonth() + 1)).slice(-2); // Adding 1 because January is 0
      let day = ('0' + currentDateTime.getDate()).slice(-2);
      let hours = ('0' + currentDateTime.getHours()).slice(-2);
      let minutes = ('0' + currentDateTime.getMinutes()).slice(-2);
      let seconds = ('0' + currentDateTime.getSeconds()).slice(-2);
      let fileName = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;

      link.href = url;
      link.setAttribute('download',  fileName + '.csv');

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  })
  .catch(error => {
      console.error('Error downloading CSV: ', error);
  });
}

export { hitApi, downloadCsv };