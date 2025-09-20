import axios from "axios";

// base axios instance for your backend
const API = axios.create({
  baseURL: "http://localhost:5000/api", // change if backend runs elsewhere
  withCredentials: true, // allows cookies (important for refresh tokens)
});

export default API;
