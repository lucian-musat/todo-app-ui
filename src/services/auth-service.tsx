import axios from "axios";
import { API_BASE_URL } from "../config";

export const registerUser = (name: string, email: string, password: string) => {
  return axios.post(`${API_BASE_URL}/users`, {
    name,
    email,
    password,
  });
};

export const loginUser = (email: string, password: string) => {
  return axios
    .post(`${API_BASE_URL}/users/login`, {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

export const logoutUser = () => {
  localStorage.removeItem("user");
};
