import axios from "axios";

const api = axios.create({
  baseURL: "https://api.hireflow.ruby.ly/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default api;
