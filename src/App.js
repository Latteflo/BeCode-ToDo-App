import React, { useState, useEffect } from "react"
import TodoList from "./TodoList"
import "./styles.css"

const App = () => {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("tasks")
      return savedTasks ? JSON.parse(savedTasks) : []
    } catch (error) {
      console.error("Error parsing tasks from localStorage:", error)
      return []
    }
  })
  const [inputValue, setInputValue] = useState("")
  const [selectedPriority, setSelectedPriority] = useState("Medium")

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task) => {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: task,
        completed: false,
        priority: selectedPriority,
      },
    ])
  }

  const updateTask = (id, newText) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    )
  }

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

  const remainingTasks = tasks.filter((task) => !task.completed).length

  return (
    <div className="App">
      <h1>My Todo App</h1>
      <div className="glass">
        <div className="content">
          <span>Choose priority level</span>
          <div className="priority-buttons">
            <br />
            <button
              data-priority="High"
              className={selectedPriority === "High" ? "active" : ""}
              onClick={(e) =>
                setSelectedPriority(e.target.getAttribute("data-priority"))
              }
            >
              High
            </button>
            <button
              data-priority="Medium"
              className={selectedPriority === "Medium" ? "active" : ""}
              onClick={(e) =>
                setSelectedPriority(e.target.getAttribute("data-priority"))
              }
            >
              Medium
            </button>
            <button
              data-priority="Low"
              className={selectedPriority === "Low" ? "active" : ""}
              onClick={(e) =>
                setSelectedPriority(e.target.getAttribute("data-priority"))
              }
            >
              Low
            </button>
          </div>{" "}
          <input
            type="text"
            placeholder="New task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && inputValue) {
                addTask(inputValue)
                setInputValue("")
              }
            }}
          />
        </div>
        <TodoList
          tasks={tasks}
          onDelete={deleteTask}
          onToggle={toggleCompletion}
          onUpdate={updateTask}
          setTasks={setTasks}
        />
      </div>
      <span>{remainingTasks} tasks remaining</span>
    </div>
  )
}

export default App
