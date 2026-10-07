import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Learn HTML", status: "Completed" },
    { id: 2, name: "Learn CSS", status: "InProgress" },
    { id: 3, name: "learn java", status: "done" },
    { id: 4, name: "learn javascript", status: "in progress" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskStatus, setTaskStatus] = useState("InProgress");

  // Add new task
  const addTask = (e) => {
    e.preventDefault();

    if (taskName.trim() === "") {
      alert("Please enter a task name");
      return;
    }

    const newTask = {
      id: Date.now(),
      name: taskName,
      status: taskStatus,
    };

    setTasks([...tasks, newTask]);

    setTaskName("");
    setTaskStatus("InProgress");
    setShowForm(false);
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="app">
      <h1>Task Manager App</h1>

      <div className="task-container">
        <h2>Task Dashboard</h2>

        {/* Task Table */}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.status}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Task Button */}
        <button
          className="add-task-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Add Task"}
        </button>

        {/* Add Task Form */}
        {showForm && (
          <form className="task-form" onSubmit={addTask}>
            <h3>Add New Task</h3>

            <label>Task Name</label>

            <input
              type="text"
              placeholder="Enter task name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />

            <label>Status</label>

            <select
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
            >
              <option value="InProgress">InProgress</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>

            <button type="submit" className="save-button">
              Add Task
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;