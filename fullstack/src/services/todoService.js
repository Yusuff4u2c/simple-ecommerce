import axios from "axios";

const API_URL = "http://localhost:3000/todos";

export const getTodos = () => axios.get(API_URL);
export const addTodo = (title) =>
  axios.post(API_URL, { title, completed: false });
export const updateTodo = (id, updates) =>
  axios.put(`${API_URL}/${id}`, updates);
export const deleteTodo = (id) => axios.delete(`${API_URL}/${id}`);
