import React, { useState } from "react"
import TodoList from "./TodoList"
import "./styles.css"

const App = () => {
  const [tasks, setTasks] = useState([])

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const addTask = (task, priority) => {
    setTasks([
      ...tasks,
      { id: Date.now(), text: task, completed: false, priority },
    ])
  }

  const updateTask = (id, newText) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    )
  }

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          placeholder="New task..."
          onKeyDown={(e) => {
            const priority = document.getElementById("priority").value
            if (e.key === "Enter" && e.target.value) {
              addTask(e.target.value, priority)
              e.target.value = ""
            }
          }}
        />
        <select id="priority">
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <TodoList
        tasks={tasks}
        onDelete={deleteTask}
        onToggle={toggleCompletion}
        onUpdate={updateTask}
      />
    </div>
  )
}

export default App
