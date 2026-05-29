/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import axios from 'axios';

// Create a configured axios instance for the Hireflow API
export const api = axios.create({
  // baseURL: 'https://api.hireflow.ruby.ly/api', // Remote production backend
  baseURL: 'http://localhost:8000/api', // Local XAMPP backend
  timeout: 15000, // 15 seconds timeout
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

export default api;
