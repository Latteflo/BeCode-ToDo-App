import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaCheck, FaRedo } from "react-icons/fa";

const TodoItem = ({ task, onDelete, onToggle, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleUpdate = () => {
    onUpdate(task.id, editedText);
    setIsEditing(false);
  };

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
    );
  }
  return (
        <li
          data-priority={task.priority}
          data-completed={task.completed ? "true" : "false"}
          style={{ textDecoration: task.completed ? "line-through" : "none" }}
        >
          <strong>{task.text}</strong>
          <div className="buttons-container">
            <button className="edit" onClick={() => setIsEditing(true)}>
              <FaEdit />
            </button>
            <button className="toggle" onClick={() => onToggle(task.id)}>
              {task.completed ? <FaRedo /> : <FaCheck />}
            </button>
            <button className="delete" onClick={() => onDelete(task.id)}>
              <FaTrashAlt />
            </button>
          </div>
        </li>
      )}


export default TodoItem;