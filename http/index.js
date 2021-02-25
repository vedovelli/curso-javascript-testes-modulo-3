import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const baseURL = publicRuntimeConfig.USE_API
  ? publicRuntimeConfig.API_URL
  : null;

const http = axios.create({
  baseURL,
});

export default http;
