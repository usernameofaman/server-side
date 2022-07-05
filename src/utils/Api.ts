import axios from 'axios';

export default axios.create({
    baseURL: process.env.REACT_APP_ADYEN_BASE_URL,
   headers: {
    'x-api-key' : process.env.REACT_APP_ADYEN_API_KEY,
    'Access-Control-Allow-Methods' : 'GET, POST, HEAD, OPTIONS, PUT, DELETE, PATCH',
  }, 
});