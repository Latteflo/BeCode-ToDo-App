import React, { useState } from "react"

const TodoItem = ({ task, onDelete, onToggle, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(task.text)

  const handleUpdate = () => {
    onUpdate(task.id, editedText)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <li>
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
        <button onClick={handleUpdate}>Save</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </li>
    )
  }

  return (
    <li style={{ textDecoration: task.completed ? "line-through" : "none" }}>
      {task.text} - <strong>{task.priority}</strong>
      <div>
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={() => onToggle(task.id)}>Toggle</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </li>
  )
}

export default TodoItem
