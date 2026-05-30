/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import axios from 'axios';

// Create a configured axios instance for the Hireflow API
export const api = axios.create({
  baseURL: '/api', 
  timeout: 15000, // 15 seconds timeout
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

export default api;
