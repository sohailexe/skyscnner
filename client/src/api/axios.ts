import axios from "axios";

export default axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Setting this globally for all requests
});
