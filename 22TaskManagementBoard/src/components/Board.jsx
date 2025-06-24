import React, { useState } from "react";
import Column from "./Column";

export default function Board({ data, setData }) {

  const [draggingTask, setDraggingTask] = useState(null);

  const onDragStart = (e, taskId, sourceColId, taskIndex) => {
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.setData("sourceColId", sourceColId);
    e.dataTransfer.setData("taskIndex", taskIndex);
    setDraggingTask({ taskId, sourceColId, taskIndex });
  };

  const onDrop = (e, destColId, destTaskIndex = null) => {
    e.preventDefault();

    const taskId = e.dataTransfer.getData("taskId");
    const sourceColId = e.dataTransfer.getData("sourceColId");
    const sourceTaskIndex = Number(e.dataTransfer.getData("taskIndex"));

    if (!taskId || !sourceColId) return;

    
    if (sourceColId === destColId) {
      if (destTaskIndex === null || destTaskIndex === sourceTaskIndex) return;

      const newTasks = Array.from(data.columns[destColId].tasks);
   
      const [removed] = newTasks.splice(sourceTaskIndex, 1);
     
      newTasks.splice(destTaskIndex, 0, removed);

      setData((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [destColId]: {
            ...prev.columns[destColId],
            tasks: newTasks,
          },
        },
      }));
    } else {
     

      const sourceTasks = Array.from(data.columns[sourceColId].tasks);
      const destTasks = Array.from(data.columns[destColId].tasks);

      const draggedTask = sourceTasks.find((t) => t.id === taskId);
      if (!draggedTask) return;

     
      const filteredSource = sourceTasks.filter((t) => t.id !== taskId);

   
      destTasks.push(draggedTask);

      setData((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [sourceColId]: {
            ...prev.columns[sourceColId],
            tasks: filteredSource,
          },
          [destColId]: {
            ...prev.columns[destColId],
            tasks: destTasks,
          },
        },
      }));
    }
  };

  const onDragOver = (e) => e.preventDefault();

  const addTask = (colId, content) => {
    if (!content.trim()) return;
    const newTask = {
      id: "task-" + Date.now(),
      content,
    };
    setData((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [colId]: {
          ...prev.columns[colId],
          tasks: [...prev.columns[colId].tasks, newTask],
        },
      },
    }));
  };

 
  const deleteTask = (colId, taskId) => {
    setData((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [colId]: {
          ...prev.columns[colId],
          tasks: prev.columns[colId].tasks.filter((t) => t.id !== taskId),
        },
      },
    }));
  };

  return (
    <div className="board">
      {data.columnOrder.map((colId) => (
        <div
          key={colId}
          className="column"
          onDrop={(e) => onDrop(e, colId)}
          onDragOver={onDragOver}
        >
          <Column
            column={data.columns[colId]}
            onDragStart={onDragStart}
            onDrop={onDrop}
            onDragOver={onDragOver}
            addTask={addTask}
            deleteTask={deleteTask}
          />
        </div>
      ))}
    </div>
  );
}
