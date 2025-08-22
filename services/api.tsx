// services/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://68a857bebb882f2aa6de443c.mockapi.io',
  timeout: 5000,
});