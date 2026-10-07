import { useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (todo.trim() === "") return;

    setTodos([...todos, todo]);
    setTodo("");
  };

  return (
    <div className="todo-app">
      <h1>To DO List App</h1>

      <h2>Add To Do</h2>

      <div className="todo-form">
        <label>To Do List</label>

        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />

        <button onClick={addTodo}>
          Add To Do
        </button>
      </div>

      <div className="todo-list">
        {todos.map((item, index) => (
          <div className="todo-item" key={index}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;