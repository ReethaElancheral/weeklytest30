

import './App.css'
import React, { useState, useEffect } from "react";
import Board from "./components/Board";

const STORAGE_KEY = "task-board-data";

export default function App() {
  const initialData = {
    columns: {
      "col-1": {
        id: "col-1",
        title: "To Do",
        tasks: [
          { id: "task-1", content: "Learn React" },
          { id: "task-2", content: "Build a Project" },
        ],
      },
      "col-2": {
        id: "col-2",
        title: "In Progress",
        tasks: [{ id: "task-3", content: "Write Documentation" }],
      },
      "col-3": {
        id: "col-3",
        title: "Done",
        tasks: [{ id: "task-4", content: "Setup Vite" }],
      },
    },
    columnOrder: ["col-1", "col-2", "col-3"],
  };

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialData;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  return (
    <div className="app">
      <h1>Task Management Board</h1>
      <Board data={data} setData={setData} />
    </div>
  );
}
