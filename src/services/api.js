import axios from 'axios';

const api = axios.create({
  baseURL: 'https://thesimpsonsapi.com/api',

});

export default api;