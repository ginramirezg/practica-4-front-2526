import axios from "axios";

export const api = axios.create({
  baseURL: "https://backend-p4-klvc.onrender.com",
  timeout: 50000,
  headers: {
    "x-nombre": "Gina",
  },
});

export const getAuthHeaders = () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  return {
    Authorization: `Bearer ${token}`,
    "x-nombre": "Gina",
  };
};