import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_USE_API
  ? process.env.NEXT_PUBLIC_API_URL
  : null;

const http = axios.create({
  baseURL,
});

export default http;
