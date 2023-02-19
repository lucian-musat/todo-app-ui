import axios from "axios";
import { IFilterStatus } from "../types/global";
import { API_BASE_URL } from "../config";
import authHeader from "./auth-header";

export const getTodos = (filterStatus: IFilterStatus) => {
  return axios.get(`${API_BASE_URL}/todos`, {
    headers: authHeader(),
    params: { status: filterStatus.length ? filterStatus : undefined },
  });
};

export const createTodo = (title: string) => {
  return axios.post(
    `${API_BASE_URL}/todos`,
    { title },
    { headers: authHeader() }
  );
};

export const deleteTodo = (id: number) => {
  return axios.delete(`${API_BASE_URL}/todos/${id}`, { headers: authHeader() });
};

export const markTodoCompleted = (id: number) => {
  return axios.patch(
    `${API_BASE_URL}/todos/${id}`,
    { status: "Completed" },
    { headers: authHeader() }
  );
};

export const markTodoUncompleted = (id: number) => {
  return axios.patch(
    `${API_BASE_URL}/todos/${id}`,
    { status: "Uncompleted" },
    { headers: authHeader() }
  );
};
