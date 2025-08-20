// components/AddTaskForm.jsx
import React, { useState, useRef } from "react";
import { Plus } from "lucide-react";

export default function AddTaskForm({ onAdd }) {
  const [newTask, setNewTask] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newTask);
    setNewTask("");
    inputRef.current?.focus();
  };

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/60 backdrop-blur p-3 shadow-lg">
      <form onSubmit={handleSubmit} className="flex gap-2" aria-label="Add a new task">
        <input
          ref={inputRef}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400/60 dark:focus:ring-indigo-500/60 text-base shadow-sm"
        />
        <button
          type="submit"
          className="flex-shrink-0 flex items-center justify-center rounded-lg px-4 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-md active:scale-[0.98] transition-all duration-200 ease-in-out"
          aria-label="Add task"
        >
          <Plus className="h-5 w-5" />
          <span className="ml-2 hidden sm:inline">Add</span>
        </button>
      </form>
    </div>
  );
}