import axios from "axios";

// base axios instance for your backend
const API = axios.create({
  baseURL: "https://cm-housing.vercel.app/", // change if backend runs elsewhere
  withCredentials: true, // allows cookies (important for refresh tokens)
});

export default API;
