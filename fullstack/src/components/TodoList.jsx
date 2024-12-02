import React, { useState, useEffect, useRef } from "react";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../services/todoService";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    // Fetch to-dos when the component mounts
    async function fetchTodos() {
      try {
        const response = await getTodos();
        setTodos(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTodos();
  }, [todos]);

  async function handleAddTodo() {
    const todo = inputRef.current.value.trim();
    console.log(todo);
    if (!todo) {
      throw new Error("Please enter a to-do");
    }
    try {
      const response = await addTodo(todo);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error(error);
    } finally {
      setNewTodo("");
    }
  }

  const handleToggleComplete = (id, completed) => {
    updateTodo(id, { completed: !completed })
      .then((response) => {
        setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
      })
      .catch(console.error);
  };

  async function handleDeleteTodo(id) {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTodo}
        ref={inputRef}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new to-do"
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => handleToggleComplete(todo.id, todo.completed)}
            >
              {todo.title}
            </span>
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
