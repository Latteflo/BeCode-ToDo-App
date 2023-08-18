import React from "react";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import TodoItem from "./TodoItem";

const TodoList = ({ tasks, onDelete, onToggle, onUpdate, setTasks }) => {
  
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed);

    setTasks(reorderedTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="taskList">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <TodoItem
                key={task.id}
                task={task}
                index={index}
                onDelete={onDelete}
                onToggle={onToggle}
                onUpdate={onUpdate}
              />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
