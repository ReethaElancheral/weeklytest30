import React, { useState } from "react";

export default function Column({
  column,
  onDragStart,
  onDrop,
  onDragOver,
  addTask,
  deleteTask,
}) {
  const [newTaskContent, setNewTaskContent] = useState("");


  const handleTaskDrop = (e, destTaskIndex) => {
    onDrop(e, column.id, destTaskIndex);
  };

  const handleAddTask = () => {
    addTask(column.id, newTaskContent);
    setNewTaskContent("");
  };

  return (
    <>
      <h2>{column.title}</h2>
      <div className="task-list">
        {column.tasks.map((task, index) => (
          <div
            key={task.id}
            draggable
            className="task"
            onDragStart={(e) => onDragStart(e, task.id, column.id, index)}
            onDrop={(e) => handleTaskDrop(e, index)}
            onDragOver={onDragOver}
          >
            {task.content}
            <button
              className="delete-btn"
              onClick={() => deleteTask(column.id, task.id)}
              aria-label="Delete task"
            >
              ×
            </button>
          </div>
        ))}

      
        <div
          className="task-dropzone"
          onDrop={(e) => handleTaskDrop(e, column.tasks.length)}
          onDragOver={onDragOver}
        />
      </div>

      <div className="add-task">
        <input
          type="text"
          placeholder="Add new task..."
          value={newTaskContent}
          onChange={(e) => setNewTaskContent(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
    </>
  );
}
