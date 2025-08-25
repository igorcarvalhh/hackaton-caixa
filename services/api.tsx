// services/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://hackaton-caixa.onrender.com/',
  timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    }
});